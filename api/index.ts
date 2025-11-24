
import express from 'express';
import cors from 'cors';
import { query } from '../server/db';

const app = express();

// Cấu hình CORS để Frontend gọi được
app.use(cors() as any);
app.use(express.json() as any);

// --- API SẢN PHẨM ---

// Lấy danh sách sản phẩm
app.get('/api/products', async (req, res) => {
  try {
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    const products = result.rows.map(row => ({
        id: row.id,
        category: row.category,
        name: row.name,
        imageUrl: row.image_url,
        description: row.description,
        usage: row.usage_guide,
        benefits: [] 
    }));
    
    // Lấy benefits (Cần tối ưu N+1 query sau này, nhưng tạm thời ok cho app nhỏ)
    for (let p of products) {
        const benRes = await query('SELECT benefit_text FROM product_benefits WHERE product_id = $1', [p.id]);
        p.benefits = benRes.rows.map((r: any) => r.benefit_text);
    }

    res.json(products);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Thêm/Sửa sản phẩm
app.post('/api/products', async (req, res) => {
    const { id, category, name, imageUrl, description, usage, benefits } = req.body;
    try {
        await query(`
            INSERT INTO products (id, category, name, image_url, description, usage_guide)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE 
            SET category = $2, name = $3, image_url = $4, description = $5, usage_guide = $6
        `, [id, category, name, imageUrl, description, usage]);

        await query('DELETE FROM product_benefits WHERE product_id = $1', [id]);
        if (benefits && benefits.length > 0) {
            for (const ben of benefits) {
                if(ben && ben.trim() !== "") {
                    await query('INSERT INTO product_benefits (product_id, benefit_text) VALUES ($1, $2)', [id, ben]);
                }
            }
        }

        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Xóa sản phẩm
app.delete('/api/products/:id', async (req, res) => {
    try {
        await query('DELETE FROM products WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// --- API TIMELINE (QUY TRÌNH) ---

// Lấy danh sách quy trình
app.get('/api/timeline', async (req, res) => {
    try {
        const timelineRes = await query('SELECT * FROM timeline_items ORDER BY id ASC');
        const timeline = [];

        for (const row of timelineRes.rows) {
            const detailsRes = await query('SELECT * FROM timeline_product_details WHERE timeline_id = $1', [row.id]);
            
            timeline.push({
                id: row.id,
                day: row.day_label,
                stage: row.stage,
                stageLabel: row.stage_label,
                title: row.title,
                action: row.action_text,
                purpose: row.purpose_text,
                products: [], // Frontend tự map nếu cần
                productDetails: detailsRes.rows.map((d: any) => ({
                    name: d.product_name,
                    purpose: d.purpose,
                    dosage: d.dosage,
                    unit: d.unit,
                    quantity: parseFloat(d.quantity),
                    totalCost: parseFloat(d.total_cost)
                })),
                totalCost: parseFloat(row.total_cost),
                imageType: row.image_type,
                imageUrl: row.image_url,
                richDetail: null 
            });
        }
        res.json(timeline);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Thêm/Sửa Quy Trình
app.post('/api/timeline', async (req, res) => {
    const { id, day, stage, stageLabel, title, action, purpose, imageType, imageUrl, totalCost, productDetails } = req.body;
    
    try {
        let timelineId = id;
        
        // Kiểm tra xem ID có tồn tại trong DB chưa
        const checkRes = await query('SELECT id FROM timeline_items WHERE id = $1', [id]);
        
        if (checkRes.rows.length > 0) {
            // Update
            await query(`
                UPDATE timeline_items 
                SET day_label=$1, stage=$2, stage_label=$3, title=$4, action_text=$5, purpose_text=$6, image_type=$7, image_url=$8, total_cost=$9
                WHERE id=$10
            `, [day, stage, stageLabel, title, action, purpose, imageType, imageUrl, totalCost, id]);
        } else {
            // Insert (Nếu ID là số tự tăng thì nên để DB lo, nhưng logic hiện tại đang dùng ID từ frontend/static data)
            // Để đơn giản, nếu ID < 1000 (giả sử static) thì update, nếu không insert mới hoặc update.
            // Ở đây ta dùng INSERT ... ON CONFLICT nếu ID được cung cấp
            
            // Nếu id là string hoặc số nhỏ, ta insert cứng. Nếu id null, ta để serial. 
            // Tuy nhiên logic frontend đang gửi id.
             await query(`
                INSERT INTO timeline_items (id, day_label, stage, stage_label, title, action_text, purpose_text, image_type, image_url, total_cost)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `, [id, day, stage, stageLabel, title, action, purpose, imageType, imageUrl, totalCost]);
        }

        // Cập nhật Product Details (Xóa hết insert lại cho dễ quản lý)
        if (timelineId) {
            await query('DELETE FROM timeline_product_details WHERE timeline_id = $1', [timelineId]);
            
            if (productDetails && productDetails.length > 0) {
                for (const d of productDetails) {
                    await query(`
                        INSERT INTO timeline_product_details (timeline_id, product_name, purpose, dosage, unit, quantity, total_cost)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                    `, [timelineId, d.name, d.purpose, d.dosage, d.unit, d.quantity, d.totalCost]);
                }
            }
        }

        res.json({ success: true });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Xóa Quy Trình
app.delete('/api/timeline/:id', async (req, res) => {
    try {
        await query('DELETE FROM timeline_items WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// IMPORTANT: Export app for Vercel Serverless
export default app;

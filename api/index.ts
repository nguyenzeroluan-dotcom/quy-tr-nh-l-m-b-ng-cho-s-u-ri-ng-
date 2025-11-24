
import express from 'express';
import cors from 'cors';
import { query } from '../server/db';

const app = express();

// Cấu hình CORS để Frontend gọi được
app.use(cors() as any);
app.use(express.json());

// --- API SẢN PHẨM ---

// Lấy danh sách sản phẩm
app.get('/api/products', async (req, res) => {
  try {
    const result = await query('SELECT * FROM products');
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
                if(ben) await query('INSERT INTO product_benefits (product_id, benefit_text) VALUES ($1, $2)', [id, ben]);
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

// --- API TIMELINE ---
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
                products: [], 
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

// IMPORTANT: Export app for Vercel Serverless
export default app;


import { Pool } from 'pg';

// Lấy chuỗi kết nối từ biến môi trường (Cài đặt trong Vercel Project Settings)
// Fallback chỉ dùng cho local dev nếu chưa setup env
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_n4DxhLIdm7cu@ep-soft-night-a1z93k4o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false // Quan trọng cho Neon DB
  },
});

export const query = async (text: string, params?: any[]) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error('Database query error', err);
    throw err;
  }
};

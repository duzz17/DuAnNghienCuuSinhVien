// IMPORT
const { Pool } = require("pg");

// DEBUG (để chắc chắn file chạy đúng)
console.log("🔌 Initializing PostgreSQL connection...");

// CREATE POOL
const pool = new Pool({
  user: "postgres", // 👈 user mặc định
  host: "localhost", // 👈 local DB
  database: "research_platform", // 👈 tên database
  password: "123456", // 👈 🔥 BẮT BUỘC: phải là STRING
  port: 5432,
  ssl: false, // 👈 tắt SSL (local)
});

// TEST CONNECTION (rất quan trọng)
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL");
    release();
  }
});

module.exports = pool;

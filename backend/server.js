// //IMPORT;
// const { Pool } = require("pg");
// // DEBUG (để chắc chắn file chạy đúng)
// console.log("🔌 Initializing PostgreSQL connection...");
// // CREATE POOL
// const pool = new Pool({
//   user: "postgres", // 👈 user mặc định
//   host: "localhost", // 👈 local DB
//   database: "research_platform", // 👈 tên database
//   password: "123456", // 👈 🔥 BẮT BUỘC: phải là STRING
//   port: 5432,
//   ssl: false, // 👈 tắt SSL (local)
// });
// // TEST CONNECTION (rất quan trọng)
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error("❌ Database connection error:", err.message);
//   } else {
//     console.log("✅ Connected to PostgreSQL");
//     release();
//   }
// });
// module.exports = pool;
//====================
// const { Pool } = require("pg");

// console.log("🔌 Initializing PostgreSQL connection...");

// const isRender = process.env.DATABASE_URL;

// const pool = new Pool(
//   isRender
//     ? {
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//           rejectUnauthorized: false,
//         },
//       }
//     : {
//         user: "postgres",
//         host: "localhost",
//         database: "research_platform",
//         password: "123456",
//         port: 5432,
//       },
// );

// // TEST CONNECTION
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error("❌ Database connection error:", err.message);
//   } else {
//     console.log("✅ Connected to PostgreSQL");
//     release();
//   }
// });

// module.exports = pool;
const express = require("express");
const pool = require("./db");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content],
    );

    res.json({
      message: "Created",
      post: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Insert error:", err.message);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// test API
app.get("/", (req, res) => {
  res.send("Server OK");
});

// tạo bảng (nếu chưa có)
async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT,
        content TEXT
      );
    `);
    console.log("✅ Tables ready");
  } catch (err) {
    console.error("❌ Create table error:", err.message);
  }
}

createTables();

// 🔥 QUAN TRỌNG
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("🚀 Server running on port", port);
});

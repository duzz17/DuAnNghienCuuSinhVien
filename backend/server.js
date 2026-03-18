const express = require("express");
const cors = require("cors");

const topicRoutes = require("./routes/topics");
const commentRoutes = require("./routes/comments");

const pool = require("./db"); // 👈 THÊM DÒNG NÀY

const app = express();

app.use(cors());
app.use(express.json());

// 👇 THÊM ĐOẠN NÀY
async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS topics (
      id SERIAL PRIMARY KEY,
      title TEXT,
      content TEXT,
      votes INT DEFAULT 0
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      topic_id INT,
      parent_id INT,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ Tables created");
}

createTables();
// 👆 KẾT THÚC

app.use("/api/topics", topicRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

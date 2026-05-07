const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ================= LOG REQUEST =================
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// ================= CREATE TABLE =================
async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        votes INT DEFAULT 0
      );
    `);

    console.log("✅ Tables ready");
  } catch (err) {
    console.error("❌ Table error:", err.message);
  }
}

// ================= ROOT TEST =================
app.get("/", (req, res) => {
  res.send("Server OK");
});

// ================= GET ALL TOPICS =================
async function getTopics(req, res) {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");

    res.json(result.rows);
  } catch (err) {
    console.error("GET topics error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

app.get("/api/topics", getTopics);
app.get("/posts", getTopics);

// ================= CREATE TOPIC =================
async function createTopic(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Missing title or content" });
    }

    const result = await pool.query(
      "INSERT INTO posts (title, content, votes) VALUES ($1, $2, 0) RETURNING *",
      [title, content],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("CREATE error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

app.post("/api/topics", createTopic);
app.post("/posts", createTopic);

// ================= VOTE =================
app.post("/api/topics/:id/vote", async (req, res) => {
  try {
    const { type } = req.body;

    if (type === "up") {
      await pool.query(
        "UPDATE posts SET votes = COALESCE(votes,0) + 1 WHERE id=$1",
        [req.params.id],
      );
    }

    if (type === "down") {
      await pool.query(
        "UPDATE posts SET votes = COALESCE(votes,0) - 1 WHERE id=$1",
        [req.params.id],
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("VOTE error:", err);
    res.status(500).json({ error: "Vote failed" });
  }
});

// ================= DELETE =================
app.delete("/api/topics/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM posts WHERE id=$1", [req.params.id]);

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ================= START SERVER =================
const port = process.env.PORT || 3000;

createTables().then(() => {
  app.listen(port, () => {
    console.log("🚀 Server running on port", port);
  });
});

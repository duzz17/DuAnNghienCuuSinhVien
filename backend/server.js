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

    await pool.query(`
      ALTER TABLE posts
      ADD COLUMN IF NOT EXISTS votes INT DEFAULT 0;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        topic_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        parent_id INT,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      ALTER TABLE comments
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
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

// ================= COMMENTS =================
app.get("/api/comments/:topicId", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE topic_id=$1 ORDER BY created_at ASC, id ASC",
      [req.params.topicId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET comments error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/comments", async (req, res) => {
  try {
    const { topic_id, parent_id, content } = req.body;

    if (!topic_id || !content) {
      return res.status(400).json({ error: "Missing topic_id or content" });
    }

    const result = await pool.query(
      `INSERT INTO comments (topic_id, parent_id, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [topic_id, parent_id || null, content],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("CREATE comment error:", err);
    res.status(500).json({ error: "Create comment failed" });
  }
});

// ================= DELETE =================
app.delete("/api/topics/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM comments WHERE topic_id=$1", [req.params.id]);
    await pool.query("DELETE FROM posts WHERE id=$1", [req.params.id]);

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ================= DELETE COMMENT =================
app.delete("/api/comments/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const result = await pool.query(
      "DELETE FROM comments WHERE id=$1 RETURNING *",
      [commentId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("DELETE comment error:", err);
    res.status(500).json({ error: "Delete comment failed" });
  }
});

// ================= START SERVER =================
const port = process.env.PORT || 3000;

createTables().then(() => {
  app.listen(port, () => {
    console.log("🚀 Server running on port", port);
  });
});

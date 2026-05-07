const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:topicId", async (req, res) => {
  const topicId = req.params.topicId;

  const result = await db.query(
    "SELECT * FROM comments WHERE topic_id=$1 ORDER BY created_at",
    [topicId],
  );

  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { topic_id, parent_id, content } = req.body;

  const result = await db.query(
    "INSERT INTO comments (topic_id,parent_id,content) VALUES ($1,$2,$3) RETURNING *",
    [topic_id, parent_id, content],
  );

  res.json(result.rows[0]);
});

router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  const result = await db.query(
    "DELETE FROM comments WHERE id=$1 RETURNING *",
    [commentId],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Comment not found" });
  }

  res.json({ message: "Comment deleted successfully" });
});

module.exports = router;

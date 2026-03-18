const express = require("express");
const router = express.Router();
const pool = require("../db"); // thêm dòng này

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM topics ORDER BY id DESC");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  const result = await pool.query(
    "INSERT INTO topics(title, content, votes) VALUES($1,$2,0) RETURNING *",
    [title, content],
  );

  res.json(result.rows[0]);
});

router.post("/:id/vote", async (req, res) => {
  const { type } = req.body;

  if (type === "up") {
    await pool.query("UPDATE topics SET votes=votes+1 WHERE id=$1", [
      req.params.id,
    ]);
  }

  if (type === "down") {
    await pool.query("UPDATE topics SET votes=votes-1 WHERE id=$1", [
      req.params.id,
    ]);
  }

  res.json({ success: true });
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  // xóa comments trước
  await pool.query("DELETE FROM comments WHERE topic_id=$1", [id]);

  // sau đó xóa topic
  await pool.query("DELETE FROM topics WHERE id=$1", [id]);

  res.json({ success: true });
});

module.exports = router;

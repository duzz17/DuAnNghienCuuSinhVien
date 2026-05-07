const pool = require("../db");

async function getComments(topicId) {
  const result = await pool.query("SELECT * FROM comments WHERE topic_id=$1", [
    topicId,
  ]);

  return result.rows;
}

async function deleteComment(commentId) {
  const result = await pool.query(
    "DELETE FROM comments WHERE id=$1 RETURNING *",
    [commentId],
  );

  return result.rows[0];
}

module.exports = { getComments, deleteComment };

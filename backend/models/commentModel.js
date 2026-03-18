const pool = require("../db");

async function getComments(topicId) {
  const result = await pool.query("SELECT * FROM comments WHERE topic_id=$1", [
    topicId,
  ]);

  return result.rows;
}

module.exports = { getComments };

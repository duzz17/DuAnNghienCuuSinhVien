const pool = require("../db");

async function getAllTopics() {
  const result = await pool.query(
    "SELECT * FROM topics ORDER BY created_at DESC",
  );

  return result.rows;
}

module.exports = {
  getAllTopics,
};

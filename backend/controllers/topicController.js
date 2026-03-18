const topicModel = require("../models/topicModel");

async function getTopics(req, res) {
  try {
    const topics = await topicModel.getAllTopics();

    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getTopics,
};
async function createTopic(req, res) {
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO topics (title, content) VALUES ($1,$2) RETURNING *",
      [title, content],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
module.exports = {
  getTopics,
  createTopic,
};

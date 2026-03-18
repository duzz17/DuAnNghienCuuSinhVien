const commentModel = require("../models/commentModel");

async function getComments(req, res) {
  const topicId = req.params.topicId;

  const comments = await commentModel.getComments(topicId);

  res.json(comments);
}

module.exports = { getComments };

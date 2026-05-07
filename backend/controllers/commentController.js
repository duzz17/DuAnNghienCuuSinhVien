const commentModel = require("../models/commentModel");

async function getComments(req, res) {
  const topicId = req.params.topicId;

  const comments = await commentModel.getComments(topicId);

  res.json(comments);
}

async function deleteComment(req, res) {
  const commentId = req.params.commentId;

  const deletedComment = await commentModel.deleteComment(commentId);

  if (!deletedComment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  res.json({ message: "Comment deleted successfully" });
}

module.exports = { getComments, deleteComment };

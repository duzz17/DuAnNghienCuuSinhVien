import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TopicPage() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const loadComments = () => {
    fetch("https://duannghiencuusinhvien.onrender.com/api/comments/" + id)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  useEffect(() => {
    loadComments();
  }, [id]);

  const createComment = async (parent_id = null) => {
    await fetch("https://duannghiencuusinhvien.onrender.com/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic_id: id,
        parent_id: parent_id,
        content: content,
      }),
    });

    setContent("");
    loadComments();
  };

  const buildTree = (comments, parent_id = null) => {
    return comments
      .filter((c) => c.parent_id === parent_id)
      .map((c) => ({
        ...c,
        replies: buildTree(comments, c.id),
      }));
  };

  const renderComments = (nodes, level = 0) => {
    return nodes.map((node) => (
      <div
        key={node.id}
        style={{
          marginLeft: level * 30 + "px",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <p>{node.content}</p>

        <button onClick={() => createComment(node.id)}>Reply</button>

        {renderComments(node.replies, level + 1)}
      </div>
    ));
  };
  return (
    <div style={{ padding: "40px" }}>
      <h2>Comments</h2>

      <textarea
        placeholder="Write comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <button onClick={() => createComment(null)}>Comment</button>

      <hr />

      {renderComments(buildTree(comments))}
    </div>
  );
}

export default TopicPage;

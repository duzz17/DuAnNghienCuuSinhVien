import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "https://duannghiencuusinhvien.onrender.com";

function TopicPage() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const loadComments = () => {
    fetch(`${BASE_URL}/api/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Load comments error:", err));
  };

  useEffect(() => {
    loadComments();
  }, [id]);

  const createComment = async (parent_id = null) => {
    const text = parent_id ? replyContent : content;

    if (!text.trim()) {
      alert("Vui long nhap noi dung");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic_id: id,
          parent_id,
          content: text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Create comment failed");
      }

      if (parent_id) {
        setReplyContent("");
        setReplyTo(null);
      } else {
        setContent("");
      }

      loadComments();
    } catch (err) {
      console.error("Create comment error:", err);
      alert(err.message);
    }
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

        {replyTo === node.id ? (
          <div>
            <textarea
              placeholder="Write reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              style={{ width: "100%", minHeight: "70px" }}
            />

            <br />

            <button onClick={() => createComment(node.id)}>Send reply</button>
            <button
              onClick={() => {
                setReplyTo(null);
                setReplyContent("");
              }}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setReplyTo(node.id)}>Reply</button>
        )}

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

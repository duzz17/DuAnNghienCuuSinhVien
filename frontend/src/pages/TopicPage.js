import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TopicPage.css";

const BASE_URL = "http://localhost:3000";

function TopicPage() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = () => {
    fetch(`${BASE_URL}/api/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Load comments error:", err));
  };

  useEffect(() => {
    loadComments();
  }, [id]);

  const createComment = async (parentId = null) => {
    const text = parentId ? replyContent : content;

    if (!text.trim()) {
      alert("Vui lòng nhập nội dung");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`${BASE_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic_id: id,
          parent_id: parentId,
          content: text.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Không thể gửi bình luận");
      }

      if (parentId) {
        setReplyContent("");
        setReplyTo(null);
      } else {
        setContent("");
      }

      loadComments();
    } catch (err) {
      console.error("Create comment error:", err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bình luận này?")) {
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Không thể xóa bình luận");
      }

      loadComments();
    } catch (err) {
      console.error("Delete comment error:", err);
      alert(err.message);
    }
  };

  const buildTree = (items, parentId = null) => {
    return items
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => ({
        ...comment,
        replies: buildTree(items, comment.id),
      }));
  };

  const formatDate = (value) => {
    if (!value) return "";

    return new Date(value).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderComments = (nodes, level = 0) => {
    return nodes.map((node) => (
      <div
        key={node.id}
        className={`comment-thread ${level > 0 ? "comment-thread-reply" : ""}`}
      >
        <article className="comment-card">
          <div className="comment-avatar">
            {node.content?.trim()?.charAt(0)?.toUpperCase() || "B"}
          </div>

          <div className="comment-body">
            <div className="comment-meta">
              <strong>Người dùng</strong>
              {node.created_at && <span>{formatDate(node.created_at)}</span>}
            </div>

            <p>{node.content}</p>

            <div className="comment-actions">
              <button type="button" onClick={() => setReplyTo(node.id)}>
                Trả lời
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteComment(node.id)}
              >
                Xóa
              </button>
            </div>

            {replyTo === node.id && (
              <div className="reply-box">
                <textarea
                  placeholder="Nhập phản hồi của bạn..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />

                <div className="reply-actions">
                  <button
                    type="button"
                    className="comment-submit"
                    onClick={() => createComment(node.id)}
                    disabled={isSubmitting}
                  >
                    Gửi trả lời
                  </button>

                  <button
                    type="button"
                    className="comment-cancel"
                    onClick={() => {
                      setReplyTo(null);
                      setReplyContent("");
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>

        {node.replies.length > 0 && (
          <div className="reply-list">
            {renderComments(node.replies, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const commentTree = buildTree(comments);

  return (
    <main className="topic-page">
      <section className="topic-panel">
        <div className="topic-header">
          <div>
            <p className="topic-eyebrow">Thảo luận</p>
            <h1>Bình luận chủ đề</h1>
          </div>

          <span>{comments.length} bình luận</span>
        </div>

        <div className="comment-composer">
          <textarea
            placeholder="Chia sẻ ý kiến của bạn..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="composer-footer">
            <span>Nội dung nên rõ ràng, lịch sự và đúng trọng tâm.</span>
            <button
              type="button"
              className="comment-submit"
              onClick={() => createComment(null)}
              disabled={isSubmitting}
            >
              Gửi bình luận
            </button>
          </div>
        </div>

        <div className="comments-list">
          {commentTree.length > 0 ? (
            renderComments(commentTree)
          ) : (
            <div className="empty-comments">
              Chưa có bình luận nào. Hãy là người đầu tiên trao đổi về chủ đề
              này.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default TopicPage;

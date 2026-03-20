import "./PageStyle.css";

function ForumPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">💬 Diễn đàn trao đổi</h1>

      <div className="card-grid">
        <div className="card">❓ Đặt câu hỏi</div>
        <div className="card">💭 Thảo luận</div>
        <div className="card">📢 Góp ý</div>
      </div>
    </div>
  );
}

export default ForumPage;

import { useLocation } from "react-router-dom";
import "./Documents.css";

function DocumentsPage() {
  const location = useLocation();

  let title = "Kho tài liệu";

  if (location.pathname.includes("research"))
    title = "📘 Bài nghiên cứu khoa học";
  if (location.pathname.includes("thesis")) title = "📄 Luận văn";
  if (location.pathname.includes("books")) title = "📚 Giáo trình";

  const files = [
    {
      name: "Nghiên cứu khoa học sinh viên.pdf",
      url: process.env.PUBLIC_URL + "/files/tailieu1.pdf",
      type: "pdf",
    },
    {
      name: "Khóa luận tốt nghiệp.docx",
      url: process.env.PUBLIC_URL + "/files/tailieu2.docx",
      type: "word",
    },
  ];

  const getIcon = (type) => {
    if (type === "pdf") return "📕";
    if (type === "word") return "📘";
    return "📄";
  };

  return (
    <div className="doc-container">
      <h1 className="doc-title">{title}</h1>

      <div className="doc-grid">
        {files.map((file, index) => (
          <div key={index} className="doc-card">
            <div className="doc-icon">{getIcon(file.type)}</div>

            <div className="doc-info">
              <p className="doc-name">{file.name}</p>
            </div>

            <a href={file.url} download className="doc-btn">
              ⬇ Tải xuống
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;

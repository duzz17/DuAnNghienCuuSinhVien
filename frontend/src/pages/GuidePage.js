import { useLocation } from "react-router-dom";
import "./PageStyle.css";

function GuidePage() {
  const location = useLocation();

  let title = "Hướng dẫn";

  if (location.pathname.includes("process")) title = "📌 Quy trình";
  if (location.pathname.includes("topic")) title = "🎯 Cách chọn đề tài";
  if (location.pathname.includes("writing")) title = "✍️ Cách viết";

  const guides = [
    {
      name: "Hướng dẫn viết báo cáo NCKH.pdf",
      url: process.env.PUBLIC_URL + "/files/guide1.pdf",
    },
    {
      name: "Cách chọn đề tài nghiên cứu.docx",
      url: process.env.PUBLIC_URL + "/files/guide2.docx",
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">{title}</h1>

      <div className="card-grid">
        {guides.map((file, index) => (
          <div key={index} className="card">
            <p>{file.name}</p>
            <a href={file.url} download className="btn">
              ⬇ Tải
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuidePage;

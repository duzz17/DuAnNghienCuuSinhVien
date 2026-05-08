import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PageStyle.css";
import UploadDocument from "../components/UploadDocument";

function NewsPage() {
  const location = useLocation();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  let title = "Tin tức";
  let newsList = [];

  const category = location.pathname.includes("events")
    ? "news-events"
    : location.pathname.includes("seminars")
      ? "news-seminars"
      : location.pathname.includes("talks")
        ? "news-talks"
        : "news";

  useEffect(() => {
    const raw = localStorage.getItem(`uploadedDocs_${category}`);
    if (raw) {
      try {
        setUploadedFiles(JSON.parse(raw));
      } catch (error) {
        setUploadedFiles([]);
      }
    } else {
      setUploadedFiles([]);
    }
  }, [category]);

  const saveUploadedFiles = (items) => {
    localStorage.setItem(`uploadedDocs_${category}`, JSON.stringify(items));
  };

  const handleUploadedFiles = (newFiles) => {
    const merged = [...newFiles, ...uploadedFiles];
    setUploadedFiles(merged);
    saveUploadedFiles(merged);
  };

  // 🔥 SỰ KIỆN
  if (location.pathname.includes("events")) {
    title = "📅 Sự kiện";

    newsList = [
      {
        title: "Bảo vệ đề tài NCKH 2021-2022",
        file: process.env.PUBLIC_URL + "/files/sukien1.docx",
      },
      {
        title: "Nghiệm thu đề tài NCKH sinh viên",
        file: process.env.PUBLIC_URL + "/files/sukien2.pdf",
      },
    ];
  }

  // 🔥 HỘI THẢO
  if (location.pathname.includes("seminars")) {
    title = "🎤 Hội thảo";

    newsList = [
      {
        title:
          "HỘI NGHỊ TỔNG KẾT HOẠT ĐỘNG NGHIÊN CỨU KHOA HỌC SINH VIÊN KHOA QUẢN TRỊ VĂN PHÒNG NĂM HỌC 2021 - 2022",
        file: process.env.PUBLIC_URL + "/files/hoithao1.docx",
      },
      {
        title:
          "HỘI NGHỊ TỔNG KẾT NGHIÊN CỨU KHOA HỌC KHOA LƯU TRỮ VÀ QUẢN TRỊ VĂN PHÒNG HƯỚNG ĐẾN CHÀO MỪNG KỶ NIỆM 66 NĂM NGÀY THÀNH LẬP HỌC VIỆN HÀNH CHÍNH VÀ QUẢN TRỊ CÔNG (29/5/1959 - 29/5/2025)",
        file: process.env.PUBLIC_URL + "/files/hoithao2.docx",
      },
      {
        title:
          "HỘI NGHỊ NGHIÊN CỨU KHOA HỌC SINH VIÊN CẤP KHOA – KHOA QUẢN LÝ PHÁT TRIỂN XÃ HỘI NĂM HỌC 2024-2025 ",
        file: process.env.PUBLIC_URL + "/files/hoithao3.docx",
      },
      {
        title:
          "HỘI NGHỊ NGHIÊN CỨU KHOA HỌC CỦA SINH VIÊN CẤP HỌC VIỆN, NĂM HỌC 2024-2025",
        file: process.env.PUBLIC_URL + "/files/hoithao4.docx",
      },
      {
        title: "HỘI NGHỊ NGHIÊN CỨU KHOA HỌC SINH VIÊN NĂM HỌC 2024 - 2025",
        file: process.env.PUBLIC_URL + "/files/hoithao5.docx",
      },
      {
        title: "NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHÔNG CHỈ LÀ MỘT BUỔI BẢO VỆ",
        file: process.env.PUBLIC_URL + "/files/hoithao6.docx",
      },
    ];
  }

  // 🔥 TỌA ĐÀM
  if (location.pathname.includes("talks")) {
    title = "💬 Tọa đàm";

    newsList = [
      {
        title:
          "TRIỂN KHAI THỰC HIỆN NGHỊ QUYẾT ĐẠI HỘI ĐẢNG LẦN THỨ XIV TRONG CÔNG TÁC GIẢNG DẠY VÀ NGHIÊN CỨU KHOA HỌC TẠI HỌC VIỆN HÀNH CHÍNH VÀ QUẢN TRỊ CÔNG  ",
        file: process.env.PUBLIC_URL + "/files/toadam1.docx",
      },
      {
        title:
          "NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHẲNG ĐỊNH TRI THỨC, CHẮP CÁNH TƯ DUY KINH TẾ TRẺ",
        file: process.env.PUBLIC_URL + "/files/toadam2.docx",
      },
    ];
  }

  const uploadsTitle =
    category === "news-events"
      ? "Đăng tài liệu Sự kiện"
      : category === "news-seminars"
        ? "Đăng tài liệu Hội thảo"
        : category === "news-talks"
          ? "Đăng tài liệu Tọa đàm"
          : "Đăng tài liệu Tin tức";

  const downloadsTitle =
    category === "news-events"
      ? "Tài liệu Sự kiện"
      : category === "news-seminars"
        ? "Tài liệu Hội thảo"
        : category === "news-talks"
          ? "Tài liệu Tọa đàm"
          : "Danh sách Tin tức";

  const combinedFiles = [...uploadedFiles, ...newsList];

  const getPreviewUrl = (fileUrl) => {
    if (fileUrl.startsWith("data:")) {
      return fileUrl;
    }
    return window.location.origin + fileUrl;
  };

  return (
    <div className="page-container">
      <h1 className="page-title">{title}</h1>

      <UploadDocument
        category={category}
        title={uploadsTitle}
        onUpload={handleUploadedFiles}
      />

      <div className="doc-list-header">
        <h2 className="downloads-title">{downloadsTitle}</h2>
      </div>

      <div className="card-grid">
        {combinedFiles.map((item, index) => {
          const fileUrl = item.url || item.file;
          const fileName = item.name || item.title;

          return (
            <div key={index} className="card">
              <h3>{fileName}</h3>

              <div className="card-actions">
                <a
                  href={getPreviewUrl(fileUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn preview-btn"
                >
                  Xem trước
                </a>

                <a href={fileUrl} download className="btn">
                  ⬇ Tải tài liệu
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewsPage;
// đã xong

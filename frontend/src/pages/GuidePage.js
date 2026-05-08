import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PageStyle.css";
import UploadDocument from "../components/UploadDocument";

function GuidePage() {
  const location = useLocation();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  let title = "Hướng dẫn";
  let guides = [];

  const category = location.pathname.includes("process")
    ? "guide-process"
    : location.pathname.includes("topic")
      ? "guide-topic"
      : location.pathname.includes("writing")
        ? "guide-writing"
        : "guide";

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

  // 🔥 ICON
  const getIcon = (type, fileUrl) => {
    if (type === "pdf") return "📕";
    if (type === "word") return "📘";
    if (fileUrl?.toLowerCase().endsWith(".pdf")) return "📕";
    return "📘";
  };

  // 🔥 QUY TRÌNH
  if (location.pathname.includes("process")) {
    title = "📌 Quy trình";

    guides = [
      {
        name: "2024 - Quy che QL hd NCKH sinh vien Hoc vien Hanh chinh Quoc gia.pdf",
        url: process.env.PUBLIC_URL + "/files/quitrinh1.pdf",
        type: "pdf",
      },
      {
        name: "HƯỚNG DẪN TÌM KIẾM TÀI LIỆU THAM KHẢO - TRƯỜNG ĐẠI HỌC Y DƯỢC HUẾ",
        url: process.env.PUBLIC_URL + "/files/quytrinh2.pdf",
        type: "pdf",
      },
      {
        name: "Tổng hợp những trang web, công cụ tìm kiếm hữu ích phục vụ cho học thuật, nghiên cứu khoa học.pdf",
        url: process.env.PUBLIC_URL + "/files/quytrinh3.pdf",
        type: "pdf",
      },
      {
        name: "HƯỚNG DẪN VIẾT BÁO CÁO TÓM TẮT.docx.pdf",
        url: process.env.PUBLIC_URL + "/files/quytrinh4.pdf",
        type: "pdf",
      },
      {
        name: "Hướng dẫn trình bày báo cáo tổng kết của đề tài - TS Le Hoang Anh .pdf",
        url: process.env.PUBLIC_URL + "/files/quytrinh5.pdf",
        type: "pdf",
      },
      {
        name: "2015 - MỘT SỐ BIỆN PHÁP PHÁT TRIỂN NĂNG LỰC NGHIÊN CỨU KHOA HỌC CHO HỌC SINH - NGUYỄN XUÂN QUI",
        url: process.env.PUBLIC_URL + "/files/quytrinh6.pdf",
        type: "pdf",
      },
    ];
  }

  // 🔥 CÁCH CHỌN ĐỀ TÀI
  if (location.pathname.includes("topic")) {
    title = "🎯 Cách chọn đề tài";

    guides = [
      {
        name: "CÁCH VIẾT ĐỀ CƯƠNG NCKH - Nguyễn Văn Tuấn",
        url: process.env.PUBLIC_URL + "/files/cachchondetai1.pdf",
        type: "pdf",
      },
      {
        name: "Chọn đề tài NCKH - maithao16092003@gmail.com.pdf",
        url: process.env.PUBLIC_URL + "/files/cachchondetai2.pdf",
        type: "pdf",
      },
      {
        name: "Top những điều nên tránh khi đứng trước Hội đồng bảo vệ NCKH - @othk.research.pdf",
        url: process.env.PUBLIC_URL + "/files/cacchondetai3.pdf",
        type: "pdf",
      },
      {
        name: "Cách tìm khoảng trống trong NCKH - Nguyen Dang Kien.pdf",
        url: process.env.PUBLIC_URL + "/files/cachchondetai4.pdf",
        type: "pdf",
      },
    ];
  }

  // 🔥 CÁCH VIẾT
  if (location.pathname.includes("writing")) {
    title = "✍️ Cách viết";

    guides = [
      {
        name: "2017 - CÁCH TRÌNH BÀY KHÓA LUẬN TỐT NGHIỆP",
        url: process.env.PUBLIC_URL + "/files/cachviet1.pdf",
        type: "pdf",
      },
      {
        name: "Cấu trúc bài NCKH - maithao16092003@gmail.com.pdf",
        url: process.env.PUBLIC_URL + "/files/cachviet2.pdf",
        type: "pdf",
      },
      {
        name: "Hướng dẫn cách trích dẫn tài liệu tham khảo - Đại học Y Hà Nội.pdf",
        url: process.env.PUBLIC_URL + "/files/cachviet3.pdf",
        type: "pdf",
      },
      {
        name: "Cách viết bài báo khoa học - Trường Đại học Tây Bắc.pdf",
        url: process.env.PUBLIC_URL + "/files/cachviet4.pdf",
        type: "pdf",
      },
    ];
  }

  const getPreviewUrl = (fileUrl) => {
    if (fileUrl.startsWith("data:")) {
      return fileUrl;
    }
    return window.location.origin + fileUrl;
  };

  const uploadsTitle =
    category === "guide-process"
      ? "Đăng tài liệu Quy trình"
      : category === "guide-topic"
        ? "Đăng tài liệu Cách chọn đề tài"
        : category === "guide-writing"
          ? "Đăng tài liệu Cách viết"
          : "Đăng tài liệu Hướng dẫn";

  const downloadsTitle =
    category === "guide-process"
      ? "Tài liệu Quy trình"
      : category === "guide-topic"
        ? "Tài liệu Cách chọn đề tài"
        : category === "guide-writing"
          ? "Tài liệu Cách viết"
          : "Danh sách Hướng dẫn";

  const combinedGuides = [...uploadedFiles, ...guides];

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
        {combinedGuides.map((file, index) => {
          const fileUrl = file.url || file.file;
          const fileName = file.name || file.title;
          const fileType =
            file.type ||
            (fileUrl?.toLowerCase().endsWith(".pdf") ? "pdf" : "word");

          return (
            <div key={index} className="card">
              <div style={{ fontSize: "30px" }}>
                {getIcon(fileType, fileUrl)}
              </div>

              <p>{fileName}</p>

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

export default GuidePage;

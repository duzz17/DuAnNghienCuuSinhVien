import { useLocation } from "react-router-dom";
import "./PageStyle.css";

function NewsPage() {
  const location = useLocation();

  let title = "Tin tức";
  let newsList = [];

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

  return (
    <div className="page-container">
      <h1 className="page-title">{title}</h1>

      <div className="card-grid">
        {newsList.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.title}</h3>

            {/* 🔥 NÚT TẢI */}
            <a href={item.file} download className="btn">
              ⬇ Tải tài liệu
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
// đã xong

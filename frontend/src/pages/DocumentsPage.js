import { useLocation } from "react-router-dom";
import "./Documents.css";

function DocumentsPage() {
  const location = useLocation();

  let title = "Kho tài liệu";
  let files = [];

  // 🔥 BÀI NCKH
  if (location.pathname.includes("research")) {
    title = "📘 Bài nghiên cứu khoa học";

    files = [
      {
        name: "2023 - DTNC.506 - Ảnh hưởng của việc làm thêm đến hoạt động nghề nghiệp của sinh viên ngành Quản trị nhân lực Trường Đại học Nội vụ Hà Nội (nay là Học viện Hành chính Quốc Gia) sau khi tốt nghiệp - Hoang Ngoc Hai.pdf",
        url: process.env.PUBLIC_URL + "/files/baiNCKH1.pdf",
        type: "pdf",
      },
      {
        name: "2023 - Pháp luật về xác định quyền sử dụng đất của thành viên hộ gia đình ở Việt Nam hiện nay - KL. 1009 Dinh Van Cong 1905LHOB009.pdf",
        url: process.env.PUBLIC_URL + "/files/baiNCKH2.pdf",
        type: "pdf",
      },
      {
        name: "2023 - DTNC. 497 - Phát triển hoạt động xã hội của sinh viên khoa Quản trị Nguồn nhân lực, trường Đại học Nội vụ Hà Nội - Nguyen Minh Hien.pdf",
        url: process.env.PUBLIC_URL + "/files/baiNCKH3.pdf",
        type: "pdf",
      },
      {
        name: "2023 - DTNC. 498 - Kỹ năng tư duy sáng tạo của sinh viên Khoa Quản trị nguồn nhân lực tại Trường Đại học Nội vụ Hà Nội - Vu Ngoc Bich.pdf",
        url: process.env.PUBLIC_URL + "/files/baiNCKH4.pdf",
        type: "pdf",
      },
      {
        name: "2023 - Thực trạng năng lực số của sinh viên Khoa quản trị nhân lực trường đại học nội vụ hà nội - Bùi Quỳnh Châu.pdf",
        url: process.env.PUBLIC_URL + "/files/baiNCKH5.pdf",
        type: "pdf",
      },
      {
        name: "2023 - DTNC. 500 - Phân tích mối quan hệ giữa chính sách tài chính đối với động lực học tập của sinh viên trường Đại học Nội vụ Hà Nội - Phung Van Nhat",
        url: process.env.PUBLIC_URL + "/files/baiNCKH6.pdf",
        type: "pdf",
      },
      {
        name: "2023 - DTNC. 501 - Thực trạng học và thi chứng chỉ tiếng Anh quốc tế của sinh viên khoa Quản trị nguồn nhân lực, trường Đại học Nội vụ Hà Nội - TongThanhPhuong.pdf",
        url: process.env.PUBLIC_URL + "/files/baiNCKH7.pdf",
        type: "pdf",
      },
    ];
  }

  // 🔥 LUẬN VĂN
  if (location.pathname.includes("thesis")) {
    title = "📄 Luận văn";

    files = [
      {
        name: "2023 - Chế độ tài sản của vợ chồng trong pháp luật Việt Nam - Do Hoang Thu Huong 1905LHOC028.pdf",
        url: process.env.PUBLIC_URL + "/files/luanvan1.pdf",
        type: "pdf",
      },
      {
        name: "2023 - DTNC. 509 - Công tác đào tạo, bồi dưỡng cán bộ, công chức cấp xã tại huyện Yên Định, tỉnh Thanh Hóa - NguyenNgocSon.pdf",
        url: process.env.PUBLIC_URL + "/files/luanvan2.pdf",
        type: "pdf",
      },
      {
        name: "2023 - Pháp luật về xác định quyền sử dụng đất của thành viên hộ gia đình ở Việt Nam hiện nay - KL. 1009 Dinh Van Cong 1905LHOB009.pdf",
        url: process.env.PUBLIC_URL + "/files/luanvan3.pdf",
        type: "pdf",
      },
      {
        name: "2023 - Quy định về thừa kế theo pháp luật trong Bộ luật dân sự Việt Nam hiện hành: Khóa luận tốt nghiệp ngành Luật học Khoa Nhà nước và Pháp luật -KL. 1004 Dang Thi Bich Phuong 1905LHOB052.pdf",
        url: process.env.PUBLIC_URL + "/files/luanvan4.pdf",
        type: "pdf",
      },
    ];
  }

  // 🔥 GIÁO TRÌNH
  if (location.pathname.includes("books")) {
    title = "📚 Giáo trình";

    files = [
      {
        name: "Kỷ yếu hội thảo 2024.pdf",
        url: process.env.PUBLIC_URL + "/files/giaotrinh1.pdf",
        type: "pdf",
      },
      {
        name: "Cấu trúc bài NCKH.pdf",
        url: process.env.PUBLIC_URL + "/files/giaotrinh2.pdf",
        type: "pdf",
      },
    ];
  }

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

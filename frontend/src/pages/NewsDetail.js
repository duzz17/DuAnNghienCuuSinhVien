import { useParams } from "react-router-dom";
import "./NewsDetail.css";

function NewsDetail() {
  const { id } = useParams();

  // 🔥 DATA GIẢ (sau này có thể fetch từ backend)
  const newsData = {
    1: {
      title: "NGHIÊN CỨU KHOA HỌC SINH VIÊN – KHOA QUẢN TRỊ NHÂN LỰC",
      content: `
      Tháng 5/2025, Khoa Quản trị nhân lực, Học viện Hành chính và Quản trị công tổ chức hoạt động báo cáo kết quả Nghiên cứu khoa học sinh viên năm học 2024-2025. Trong năm học vừa qua, sinh viên Khoa Quản trị nhân lực đã có nhiều cố gắng đáng ghi nhận trong hoạt động nghiên cứu khoa học. Đặc biệt, 12 đề tài nghiên cứu của sinh viên đã được hoàn thiện và báo cáo thành công, nhận được những đánh giá tích cực từ hội đồng chuyên môn về tính thực tiễn và khả năng ứng dụng.

      Hoạt động Nghiên cứu khoa học luôn được Khoa khuyến khích như một phần không thể thiếu trong hành trình học tập và trưởng thành của sinh viên. Thành công của các đề tài không chỉ thể hiện năng lực tư duy nghiên cứu độc lập, tinh thần học thuật nghiêm túc mà còn khẳng định chất lượng đào tạo và sự đồng hành của giảng viên Khoa Quản trị nhân lực trong việc phát triển năng lực nghiên cứu và ứng dụng thực tiễn cho sinh viên.

Xin chúc mừng tất cả các bạn sinh viên và giảng viên hướng dẫn đã góp phần làm nên một mùa nghiên cứu khoa học thành công rực rỡ!



      `,
      image: process.env.PUBLIC_URL + "/anh1.png",
    },

    2: {
      title: "NGHIÊN CỨU KHOA HỌC SINH VIÊN",
      image: process.env.PUBLIC_URL + "/anh2.png",
      content: `
      Nghiên cứu khoa học sinh viên là một hoạt động không thể thiếu trong quá trình đào tạo tại khoa Pháp luật hành chính. Với sự hỗ trợ từ các giảng viên trong Khoa, 10 đề tài nghiên cứu khoa học sinh viên đã được hoàn thành trong năm học 2021-2022.
      Ngày 26/4/2022, tại phòng A104 và D402 trường Đại học Nội vụ Hà Nội với sự tham gia của các thầy cô trong khoa đã diễn ra buổi bảo vệ các đề tài nghiên cứu khoa học cấp khoa của các bạn sinh viên khoa Pháp luật hành chính.

Trong buổi bảo vệ, các nhóm lần lượt trình bày kết quả nghiên cứu khoa học đã thực hiện được. Trên cơ sở đó, các thầy cô trong Hội đồng đã đưa ra những góp ý về nội dung nghiên cứu, hình thức trình bày giúp các nhóm chỉnh sửa, bổ sung hoàn thiện hơn. 

      `,
    },
    3: {
      title: "NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHÔNG CHỈ LÀ MỘT BUỔI BẢO VỆ ",
      image: process.env.PUBLIC_URL + "/anh6.png",
      content: `
      Ngày 12&13/5/2025, Khoa Khoa học liên ngành - Ngoại ngữ - Tin học tổ chức Hội đồng nghiệm thu các đề tài Nghiên cứu khoa học sinh viên năm học 2024–2025.

Không chỉ là một hoạt động học thuật thường niên, buổi nghiệm thu còn là sân chơi trí tuệ nơi sinh viên thể hiện khả năng tư duy phản biện, giải quyết vấn đề và kết nối kiến thức chuyên ngành với thực tiễn đời sống.


Các nhóm nghiên cứu đã mang đến nhiều đề tài độc đáo, phản ánh sự sáng tạo, tinh thần học hỏi và trách nhiệm khoa học. Những trang slide không chỉ trình bày kết quả, mà còn kể lại hành trình nỗ lực bền bỉ và tinh thần đồng đội trong suốt quá trình nghiên cứu.

Mỗi đề tài được bảo vệ thành công là một bước trưởng thành – trong tư duy, trong kỹ năng, và cả trong ước mơ nghề nghiệp của sinh viên Khoa Khoa học liên ngành - Ngoại ngữ - Tin học.

Cùng nhìn lại những khoảnh khắc ấn tượng của buổi nghiệm thu và tiếp thêm động lực cho những bạn trẻ đang nuôi dưỡng niềm đam mê nghiên cứu!

      `,
    },
    4: {
      title:
        "NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHẲNG ĐỊNH TRI THỨC, CHẮP CÁNH TƯ DUY KINH TẾ TRẺ",
      image: process.env.PUBLIC_URL + "/anh7.png",
      content: `
      Ngày 09/5/2025, Khoa Kinh tế tổ chức Hội đồng nghiệm thu đề tài Nghiên cứu khoa học sinh viên năm học 2024 – 2025. Đây là hoạt động thường niên có tính học thuật cao, không chỉ góp phần bồi dưỡng tinh thần nghiên cứu khoa học trong sinh viên mà còn là dịp để đánh giá quá trình rèn luyện tư duy logic, kỹ năng xử lý vấn đề và khả năng vận dụng kiến thức chuyên ngành vào thực tiễn.
      Các nhóm nghiên cứu đã mang đến nhiều công trình nghiên cứu có chiều sâu và tính ứng dụng thực tiễn cao phản ánh nỗ lực và tinh thần làm việc nghiêm túc. 
Các chủ đề nghiên cứu năm nay rất đa dạng và gắn với các xu hướng kinh tế hiện đại như: logistics và chuỗi cung ứng, quản trị nguồn nhân lực, quản lý tài chính cá nhân, chuyển đổi số trong kinh doanh, phát triển du lịch bền vững, đổi mới sáng tạo, khởi nghiệp,…
Kết quả của buổi nghiệm thu hôm nay không chỉ là thành quả học thuật mà còn là minh chứng cho hành trình trưởng thành về tư duy và bản lĩnh nghề nghiệp của sinh viên Khoa Kinh tế.

      `,
    },
  };

  const article = newsData[id];

  if (!article) return <h2>Không tìm thấy bài viết</h2>;
  const paragraphs = article.content.trim().split("\n");
  return (
    <div className="news-detail">
      <h1 className="news-detail-title">{article.title}</h1>

      <div className="news-content">
        {paragraphs.map((para, index) => (
          <div key={index}>
            {/* TEXT */}
            <p>{para}</p>

            {/* 👉 CHÈN ẢNH SAU ĐOẠN 1 */}
            {index === 0 && (
              <div className="news-image-block">
                <img src={article.image} alt="" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsDetail;

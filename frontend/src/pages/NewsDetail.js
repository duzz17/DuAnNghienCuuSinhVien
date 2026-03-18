import { useParams } from "react-router-dom";

function NewsDetail() {
  const { id } = useParams();

  const data = {
    1: {
      title: "Hội thảo khoa học",
      content: "Nội dung chi tiết bài viết 1...",
      img: "/assets/1.JPG",
    },
    2: {
      title: "Phiên tòa giả định",
      content: "Nội dung chi tiết bài viết 2...",
      img: "/assets/2.JPG",
    },
  };

  const news = data[id];

  return (
    <div style={{ padding: "40px" }}>
      <h1>{news.title}</h1>
      <img src={news.img} style={{ width: "100%", maxWidth: "600px" }} />
      <p>{news.content}</p>
    </div>
  );
}

export default NewsDetail;

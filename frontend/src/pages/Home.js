import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  // ===== FORUM STATE =====
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ===== LOAD DATA =====
  const loadTopics = () => {
    fetch("https://duannghiencuusinhvien.onrender.com/api/topics")
      .then((res) => res.json())
      .then((data) => setTopics(data));
  };

  useEffect(() => {
    loadTopics();
  }, []);

  // ===== CREATE =====
  const createTopic = async () => {
    await fetch("https://duannghiencuusinhvien.onrender.com/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    loadTopics();
  };

  // ===== VOTE =====
  const vote = async (id, type) => {
    await fetch(
      "https://duannghiencuusinhvien.onrender.com/api/topics/" + id + "/vote",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      },
    );

    loadTopics();
  };

  // ===== DELETE =====
  const deleteTopic = async (id) => {
    await fetch("https://duannghiencuusinhvien.onrender.com/api/topics/" + id, {
      method: "DELETE",
    });

    loadTopics();
  };

  return (
    <div>
      {/* ================= BẢNG TIN ================= */}
      <div className="news-section">
        <h2>BẢN TIN</h2>

        <div className="news-grid">
          <div
            className="news-big"
            onClick={() => window.open("/news/1", "_blank")}
          >
            <img src={process.env.PUBLIC_URL + "/anh1.png"} />
            <div className="news-title">
              NGHIÊN CỨU KHOA HỌC SINH VIÊN – KHOA QUẢN TRỊ NHÂN LỰC
            </div>
          </div>

          <div
            className="news-small"
            onClick={() => window.open("/news/1", "_blank")}
          >
            <img src={process.env.PUBLIC_URL + "/anh2.png"} />
            <p>BẢO VỆ ĐỀ TÀI NGHIÊN CỨU KHOA HỌC</p>
          </div>

          <div
            className="news-small"
            onClick={() => window.open("/news/1", "_blank")}
          >
            <img src={process.env.PUBLIC_URL + "/anh3.png"} />
            <p>NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHÔNG CHỈ LÀ MỘT BUỔI BẢO VỆ </p>
          </div>

          <div
            className="news-small"
            onClick={() => window.open("/news/1", "_blank")}
          >
            <img src={process.env.PUBLIC_URL + "/anh4.png"} />
            <p>
              NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHẲNG ĐỊNH TRI THỨC, CHẮP CÁNH TƯ
              DUY KINH TẾ TRẺ
            </p>
          </div>
        </div>
      </div>

      {/* ================= DIỄN ĐÀN ================= */}
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
          {/* LEFT */}
          <div className="col-span-3">
            <h1 className="text-3xl font-bold mb-6">Diễn đàn NCKH</h1>

            {/* CREATE */}
            <div className="bg-white shadow rounded p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Tạo chủ đề</h2>

              <input
                className="border w-full p-2 mb-3 rounded"
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="border w-full p-2 mb-3 rounded"
                placeholder="Nội dung"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={createTopic}
              >
                Đăng bài
              </button>
            </div>

            {/* LIST */}
            <h2 className="text-xl font-semibold mb-4">Danh sách bài viết</h2>

            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white border rounded-lg p-4 mb-4 flex hover:shadow-lg transition"
              >
                {/* VOTE */}
                <div className="flex flex-col items-center mr-4">
                  <button onClick={() => vote(topic.id, "up")}>⬆</button>

                  <span>{topic.votes || 0}</span>

                  <button onClick={() => vote(topic.id, "down")}>⬇</button>
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Link to={"/topic/" + topic.id}>
                      <h3 className="font-bold text-blue-600 hover:underline">
                        {topic.title}
                      </h3>
                    </Link>

                    <button
                      onClick={() => deleteTopic(topic.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </div>

                  <p className="text-gray-600 mt-2">{topic.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-white p-4 rounded shadow h-fit">
            <h2 className="text-lg font-bold mb-4">Thông tin</h2>

            <p className="text-gray-600 text-sm mb-3">
              Nơi trao đổi nghiên cứu khoa học.
            </p>

            <div className="text-sm">Tổng bài viết: {topics.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const BASE_URL =
  process.env.REACT_APP_API_URL || "https://duannghiencuusinhvien.onrender.com";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ================= LOAD TOPICS =================
  const loadTopics = () => {
    fetch(`${BASE_URL}/api/topics`)
      .then((res) => res.json())
      .then((data) => setTopics(data))
      .catch((err) => console.error("Load error:", err));
  };

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (location.search.includes("scroll=forum")) {
      const forumSection = document.getElementById("forum-section");
      if (forumSection) {
        forumSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.search]);

  // ================= CREATE TOPIC =================
  const createTopic = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Create failed");
      }

      setTitle("");
      setContent("");
      loadTopics();
    } catch (err) {
      console.error("Create error:", err.message);
      alert(err.message);
    }
  };

  // ================= VOTE =================
  const vote = async (id, type) => {
    try {
      await fetch(`${BASE_URL}/api/topics/${id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      loadTopics();
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  // ================= DELETE =================
  const deleteTopic = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/topics/${id}`, {
        method: "DELETE",
      });

      loadTopics();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      {/* ================= BẢN TIN ================= */}
      <div className="news-section">
        <h2 className="section-title">BẢN TIN</h2>

        <div className="news-grid">
          <div className="news-big" onClick={() => navigate("/news/1")}>
            <img
              src={process.env.PUBLIC_URL + "/anh1.png"}
              alt="Bản tin nghiên cứu khoa học"
            />
            <div className="news-card-title">
              NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHOA QUẢN TRỊ NHÂN LỰC
            </div>
          </div>

          <div className="news-small" onClick={() => navigate("/news/2")}>
            <img
              src={process.env.PUBLIC_URL + "/anh2.png"}
              alt="Bảo vệ đề tài nghiên cứu khoa học"
            />
            <p>BẢO VỆ ĐỀ TÀI NGHIÊN CỨU KHOA HỌC</p>
          </div>

          <div className="news-small" onClick={() => navigate("/news/3")}>
            <img
              src={process.env.PUBLIC_URL + "/anh3.png"}
              alt="Nghiên cứu khoa học sinh viên"
            />
            <p>NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHÔNG CHỈ LÀ MỘT BUỔI BẢO VỆ</p>
          </div>

          <div className="news-small" onClick={() => navigate("/news/4")}>
            <img
              src={process.env.PUBLIC_URL + "/anh4.png"}
              alt="Khẳng định tri thức"
            />
            <p>
              NGHIÊN CỨU KHOA HỌC SINH VIÊN - KHẲNG ĐỊNH TRI THỨC, CHẮP CÁNH TƯ
              DUY KINH TẾ TRẺ
            </p>
          </div>
        </div>
      </div>

      {/* ================= FORUM ================= */}
      <div id="forum-section" className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
          {/* LEFT */}
          <div className="col-span-3">
            <h1 className="text-3xl font-bold mb-6">Diễn đàn NCKH</h1>

            {/* CREATE */}
            <div className="bg-white shadow rounded p-6 mb-6">
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
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white border rounded-lg p-4 mb-4 flex"
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
                    <Link to={`/topic/${topic.id}`}>
                      <h3 className="font-bold text-blue-600">{topic.title}</h3>
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
          <div className="col-span-1">
            <div className="bg-white shadow rounded p-4">
              <h3 className="font-bold mb-4">Thống kê</h3>
              <p>Tổng số bài viết: {topics.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

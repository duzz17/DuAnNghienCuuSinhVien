import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import "./App.css";
import { useState, useEffect } from "react";
import NewsDetail from "./pages/NewsDetail";
import { Link } from "react-router-dom";
import NewsPage from "./pages/NewsPage";
import DocumentsPage from "./pages/DocumentsPage";
import GuidePage from "./pages/GuidePage";
import ForumPage from "./pages/ForumPage";
function App() {
  // 🔥 DANH SÁCH ẢNH
  const images = [
    process.env.PUBLIC_URL + "/banner1.png",
    process.env.PUBLIC_URL + "/banner2.png",
    process.env.PUBLIC_URL + "/banner3.png",
  ];

  // 🔥 STATE
  const [index, setIndex] = useState(0);

  // 🔥 AUTO SLIDE (3 giây)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 NÚT TRÁI
  const prevSlide = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  // 🔥 NÚT PHẢI
  const nextSlide = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <HashRouter>
      <div>
        {/* TOPBAR */}
        <div className="topbar">
          <div>Học viện Hành chính và Quản trị công</div>
          <div className="lang">Tiếng Việt 🇻🇳</div>
        </div>

        {/* NAVBAR */}
        <div className="navbar">
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/logo.jpg"} alt="logo" />
          </div>

          <div className="menu">
            {/* TRANG CHỦ */}
            <Link to="/" className="menu-item">
              TRANG CHỦ
            </Link>

            {/* TIN TỨC */}
            <div className="menu-item">
              TIN TỨC
              <div className="dropdown">
                <Link to="/news/events">Sự kiện</Link>
                <Link to="/news/seminars">Hội thảo</Link>
                <Link to="/news/talks">Tọa đàm</Link>
              </div>
            </div>

            {/* KHO TÀI LIỆU */}
            <div className="menu-item">
              KHO TÀI LIỆU
              <div className="dropdown">
                <Link to="/documents/research">Bài NCKH</Link>
                <Link to="/documents/thesis">Luận văn</Link>
                <Link to="/documents/books">Giáo trình</Link>
              </div>
            </div>

            {/* HƯỚNG DẪN */}
            <div className="menu-item">
              HƯỚNG DẪN NCKH
              <div className="dropdown">
                <Link to="/guide/process">Quy trình</Link>
                <Link to="/guide/topic">Cách chọn đề tài</Link>
                <Link to="/guide/writing">Cách viết</Link>
              </div>
            </div>

            {/* DIỄN ĐÀN */}
            <div className="menu-item">
              DIỄN ĐÀN TRAO ĐỔI
              <div className="dropdown">
                <Link to="/forum/questions">Đặt câu hỏi</Link>
                <Link to="/forum/discussion">Thảo luận</Link>
                <Link to="/forum/feedback">Góp ý</Link>
              </div>
            </div>
          </div>

          <input className="search" placeholder="🔍 Tìm kiếm..." />
        </div>

        {/* 🎯 BANNER SLIDER */}
        <div className="banner">
          <img src={images[index]} className="banner-img" alt="banner" />

          {/* TEXT */}
          <div className="banner-text">
            <h1>DIỄN ĐÀN NCKH SINH VIÊN</h1>
            <p>Kết nối - Chia sẻ - Phát triển</p>
          </div>

          {/* BUTTON */}
          <button className="prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="next" onClick={nextSlide}>
            ❯
          </button>

          {/* DOTS */}
          <div className="dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={i === index ? "dot active" : "dot"}
                onClick={() => setIndex(i)}
              ></span>
            ))}
          </div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/news/events" element={<NewsPage />} />
          <Route path="/news/seminars" element={<NewsPage />} />
          <Route path="/news/talks" element={<NewsPage />} />

          <Route path="/documents/research" element={<DocumentsPage />} />
          <Route path="/documents/thesis" element={<DocumentsPage />} />
          <Route path="/documents/books" element={<DocumentsPage />} />

          <Route path="/guide/process" element={<GuidePage />} />
          <Route path="/guide/topic" element={<GuidePage />} />
          <Route path="/guide/writing" element={<GuidePage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

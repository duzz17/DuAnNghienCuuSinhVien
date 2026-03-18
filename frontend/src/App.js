import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import "./App.css";
import { useState, useEffect } from "react";
import NewsDetail from "./pages/NewsDetail";

function App() {
  // 🔥 DANH SÁCH ẢNH
  const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

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
          <div>HỌC VIỆN HC VÀ QTC</div>
          <div className="lang">Tiếng Việt 🇻🇳</div>
        </div>

        {/* NAVBAR */}
        <div className="navbar">
          <div className="logo">APAG</div>

          <div className="menu">
            <div className="menu-item">TRANG CHỦ</div>

            <div className="menu-item">
              TIN TỨC
              <div className="dropdown">
                <div>Sự kiện</div>
                <div>Hội thảo</div>
                <div>Tọa đàm</div>
              </div>
            </div>

            <div className="menu-item">
              KHO TÀI LIỆU
              <div className="dropdown">
                <div>Bài NCKH</div>
                <div>Luận văn</div>
                <div>Giáo trình</div>
              </div>
            </div>

            <div className="menu-item">
              CHỨC NĂNG NCKH
              <div className="dropdown">
                <div>Quy trình</div>
                <div>Cách chọn đề tài</div>
                <div>Cách viết</div>
              </div>
            </div>

            <div className="menu-item">
              DIỄN ĐÀN TRAO ĐỔI
              <div className="dropdown">
                <div>Đặt câu hỏi</div>
                <div>Thảo luận</div>
                <div>Góp ý</div>
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
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

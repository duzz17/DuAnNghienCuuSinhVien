import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import "./App.css";
import { useState, useEffect } from "react";
import NewsDetail from "./pages/NewsDetail";
import NewsPage from "./pages/NewsPage";
import DocumentsPage from "./pages/DocumentsPage";
import GuidePage from "./pages/GuidePage";
import Navbar from "./components/Navbar";
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
  }, [images.length]);

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
        <Navbar />

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

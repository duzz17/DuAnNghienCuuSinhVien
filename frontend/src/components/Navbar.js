import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import filesData from "../data/filesData";

function Navbar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const highlightText = (text, keyword) => {
    if (!keyword) return text;

    const parts = text.split(new RegExp(`(${keyword})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <b key={index} style={{ color: "red" }}>
          {part}
        </b>
      ) : (
        part
      ),
    );
  };

  const handleSearch = (value) => {
    setSearch(value);

    if (!value) {
      setResults([]);
      return;
    }

    const filtered = filesData.filter((file) =>
      file.name.toLowerCase().includes(value.toLowerCase()),
    );

    setResults(filtered);

    //
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + "/logo.jpg"} alt="logo" />
      </div>

      <div className="menu">
        <Link to="/" className="menu-item">
          TRANG CHỦ
        </Link>

        <div className="menu-item">
          TIN TỨC
          <div className="dropdown">
            <Link to="/news/events">Sự kiện</Link>
            <Link to="/news/seminars">Hội thảo</Link>
            <Link to="/news/talks">Tọa đàm</Link>
          </div>
        </div>

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
            <Link to="/?scroll=forum">Đặt câu hỏi</Link>
            <Link to="/?scroll=forum">Thảo luận</Link>
            <Link to="/?scroll=forum">Góp ý</Link>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="search"
        placeholder="🔍 Tìm tài liệu..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* RESULT */}
      {results.length > 0 && (
        <div className="search-results">
          {results.map((item, i) => (
            <div
              key={i}
              className="search-item"
              onClick={() => {
                navigate(`/documents/${item.category}`);
                setSearch("");
                setResults([]);
              }}
            >
              📄 {highlightText(item.name, search)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;

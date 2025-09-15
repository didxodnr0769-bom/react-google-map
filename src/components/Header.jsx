import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES, PAGE_INFO } from "@/constants/routes";
import "@/components/Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: ROUTES.OVERVIEW, title: "개요" },
    { path: ROUTES.INTEGRATION, title: "연동 방법" },
    { path: ROUTES.MAP_BASIC, title: "Map 기본 테스트" },
    { path: ROUTES.MAP_MARKER, title: "Map Marker 테스트" },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* 햄버거 메뉴 버튼 */}
          <button
            className={`hamburger-btn ${isOpen ? "open" : ""}`}
            onClick={toggleSidebar}
            aria-label="메뉴 토글"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* 현재 페이지 제목 */}
          <h1 className="page-title">
            {PAGE_INFO[location.pathname]?.title || "Google Maps React"}
          </h1>
        </div>
      </header>

      {/* 오버레이 */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* 사이드바 */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Google Maps React</h2>
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="사이드바 닫기"
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  className={`nav-item ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Header;

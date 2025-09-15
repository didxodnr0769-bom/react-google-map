import { useState } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_INFO } from "@/constants/routes";
import SideBar from "./SideBar";
import "@/components/Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
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

      <SideBar isOpen={isOpen} onClose={closeSidebar} />
    </>
  );
};

export default Header;

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_INFO } from "@/constants/routes";
import SideBar from "./SideBar";
import "@/components/Header.css";

const Header = ({ isOpen, onToggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      <header className={`header ${isOpen ? "sidebar-open" : ""}`}>
        <div className="header-container">
          {/* 햄버거 메뉴 버튼 - 사이드바가 열려있을 때 숨김 */}
          {!isOpen && (
            <button
              className="hamburger-btn"
              onClick={onToggleSidebar}
              aria-label="메뉴 토글"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}

          {/* 현재 페이지 제목 */}
          <h1 className="page-title">
            {PAGE_INFO[location.pathname]?.title || "Google Maps React"}
          </h1>

          {/* 메뉴 아이콘이 있을 때 제목을 정중앙으로 만들기 위한 빈 공간 */}
          {!isOpen && (
            <div
              className="hamburger-btn"
              style={{ visibility: "hidden" }}
            ></div>
          )}
        </div>
      </header>

      <SideBar isOpen={isOpen} onClose={() => onToggleSidebar()} />
    </>
  );
};

export default Header;

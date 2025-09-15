import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import "@/components/SideBar.css";

const SideBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: ROUTES.OVERVIEW, title: "개요" },
    { path: ROUTES.INTEGRATION, title: "연동 방법" },
    { path: ROUTES.MAP_BASIC, title: "Map 기본 테스트" },
    { path: ROUTES.MAP_MARKER, title: "Marker 기본 테스트" },
    { path: ROUTES.MAP_MARKER_CUSTOM, title: "Marker 커스텀 테스트" },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      {/* 사이드바 */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Google Maps React</h2>
          <button
            className="close-btn"
            onClick={onClose}
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

export default SideBar;

import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import "@/components/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to={ROUTES.HOME} className="header-logo">
          <h2>🗺️ Map Test</h2>
        </Link>

        <nav className="header-nav">
          <Link to={ROUTES.MAP_BASIC} className="header-nav-link">
            기본 테스트
          </Link>
          <Link to={ROUTES.MAP_MARKER} className="header-nav-link">
            마커 테스트
          </Link>
          <Link to={ROUTES.MAP_LOCATION} className="header-nav-link">
            위치 테스트
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

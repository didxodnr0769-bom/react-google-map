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
      </div>
    </header>
  );
};

export default Header;

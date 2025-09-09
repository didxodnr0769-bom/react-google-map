import { Link } from "react-router-dom";
import { ROUTES, PAGE_INFO } from "@/constants/routes";
import "@/pages/MainPage.css";

const MainPage = () => {
  const testPages = [
    {
      path: ROUTES.MAP_BASIC,
      ...PAGE_INFO[ROUTES.MAP_BASIC],
    },
    {
      path: ROUTES.MAP_MARKER,
      ...PAGE_INFO[ROUTES.MAP_MARKER],
    },
    {
      path: ROUTES.MAP_MARKER_CUSTOM,
      ...PAGE_INFO[ROUTES.MAP_MARKER_CUSTOM],
    },
    {
      path: ROUTES.MAP_CONTROL,
      ...PAGE_INFO[ROUTES.MAP_CONTROL],
    },
  ];

  return (
    <div className="main-page">
      <div className="main-container">
        <h1>Map 테스트 페이지</h1>
        <p>다양한 Google Maps 기능을 테스트할 수 있는 페이지들입니다.</p>

        <div className="test-grid">
          {testPages.map((test, index) => (
            <Link key={index} to={test.path} className="test-card">
              <h3>{test.title}</h3>
              <p>{test.description}</p>
              <span className="test-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

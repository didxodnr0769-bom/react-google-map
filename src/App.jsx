import { useState } from "react";
import "@/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import Header from "@/components/Header";
import OverviewPage from "@/pages/OverviewPage";
import IntegrationPage from "@/pages/IntegrationPage";
import { LoadScript } from "@react-google-maps/api";
import MapControlPage from "@/pages/map/MapControlPage";
import MapDirectionsPage from "@/pages/map/MapDirectionsPage";
import BasicTestPage from "@/pages/map/BasicTestPage";
import MapMarkerPage from "@/pages/marker/MapMarkerPage";
import CustomMarkerTestPage from "@/pages/marker/CustomMarkerTestPage";
import OverlayBasicPage from "@/pages/overlay/OverlayBasicPage";
import PollylineTestPage from "@/pages/overlay/PollylineTestPage";
import PolygonTestPage from "@/pages/overlay/PolygonTestPage";

const libraries = ["places", "drawing", "geometry"];

function App() {
  // 모바일에서는 기본적으로 사이드바 닫힘, 데스크톱에서는 열림
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth > 768; // 768px 이상에서는 열림, 이하는 닫힘
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
        libraries={libraries}
      >
        <div className="app">
          <Header isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
          <main
            className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}
          >
            <Routes>
              {/* 메인 페이지 */}
              <Route path={ROUTES.HOME} element={<OverviewPage />} />
              {/* 연동 방법 페이지 */}
              <Route path={ROUTES.INTEGRATION} element={<IntegrationPage />} />
              {/* 기본 맵 테스트 */}
              <Route path={ROUTES.MAP_BASIC} element={<BasicTestPage />} />
              {/* 마커 테스트 */}
              <Route path={ROUTES.MARKER_BASIC} element={<MapMarkerPage />} />
              {/* 커스텀 마커 테스트 */}
              <Route
                path={ROUTES.MARKER_CUSTOM}
                element={<CustomMarkerTestPage />}
              />
              {/* 컨트롤 테스트 */}
              <Route path={ROUTES.MAP_CONTROL} element={<MapControlPage />} />
              {/* 경로 표출 테스트 */}
              <Route
                path={ROUTES.MAP_DIRECTIONS}
                element={<MapDirectionsPage />}
              />
              {/* 오버레이 테스트 */}
              <Route
                path={ROUTES.OVERLAY_BASIC}
                element={<OverlayBasicPage />}
              />
              {/* 폴리라인 테스트 */}
              <Route
                path={ROUTES.OVERLAY_POLYLINE}
                element={<PollylineTestPage />}
              />
              {/* 폴리곤 테스트 */}
              <Route
                path={ROUTES.OVERLAY_POLYGON}
                element={<PolygonTestPage />}
              />
            </Routes>
          </main>
        </div>
      </LoadScript>
    </Router>
  );
}

export default App;

import "@/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import Header from "@/components/Header";
import MainPage from "@/pages/MainPage";
import OverviewPage from "@/pages/OverviewPage";
import IntegrationPage from "@/pages/IntegrationPage";
import MapBasicPage from "@/pages/map/MapBasicPage";
import MapMarkerPage from "@/pages/map/MapMarkerPage";
import MapMarkerCustomPage from "@/pages/map/MapMarkerCustomPage";
import MapLocationPage from "@/pages/map/MapLocationPage";
import { LoadScript } from "@react-google-maps/api";
import MapControlPage from "@/pages/map/MapControlPage";
import MapDirectionsPage from "@/pages/map/MapDirectionsPage";

const libraries = ["places", "drawing", "geometry"];

function App() {
  return (
    <Router>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
        libraries={libraries}
      >
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              {/* 메인 페이지 */}
              <Route path={ROUTES.HOME} element={<MainPage />} />
              {/* 개요 페이지 */}
              <Route path={ROUTES.OVERVIEW} element={<OverviewPage />} />
              {/* 연동 방법 페이지 */}
              <Route path={ROUTES.INTEGRATION} element={<IntegrationPage />} />
              {/* 기본 맵 테스트 */}
              <Route path={ROUTES.MAP_BASIC} element={<MapBasicPage />} />
              {/* 마커 테스트 */}
              <Route path={ROUTES.MAP_MARKER} element={<MapMarkerPage />} />
              {/* 커스텀 마커 테스트 */}
              <Route
                path={ROUTES.MAP_MARKER_CUSTOM}
                element={<MapMarkerCustomPage />}
              />
              {/* 위치 테스트 */}
              <Route path={ROUTES.MAP_LOCATION} element={<MapLocationPage />} />
              {/* 컨트롤 테스트 */}
              <Route path={ROUTES.MAP_CONTROL} element={<MapControlPage />} />
              {/* 경로 표출 테스트 */}
              <Route
                path={ROUTES.MAP_DIRECTIONS}
                element={<MapDirectionsPage />}
              />
            </Routes>
          </main>
        </div>
      </LoadScript>
    </Router>
  );
}

export default App;

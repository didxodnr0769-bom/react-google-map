import "@/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import Header from "@/components/Header";
import MainPage from "@/pages/MainPage";
import MapBasicPage from "@/pages/map/MapBasicPage";
import MapMarkerPage from "@/pages/map/MapMarkerPage";
import MapMarkerCustomPage from "@/pages/map/MapMarkerCustomPage";
import MapLocationPage from "@/pages/map/MapLocationPage";
import { LoadScript } from "@react-google-maps/api";

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
              <Route path={ROUTES.HOME} element={<MainPage />} />
              <Route path={ROUTES.MAP_BASIC} element={<MapBasicPage />} />
              <Route path={ROUTES.MAP_MARKER} element={<MapMarkerPage />} />
              <Route
                path={ROUTES.MAP_MARKER_CUSTOM}
                element={<MapMarkerCustomPage />}
              />
              <Route path={ROUTES.MAP_LOCATION} element={<MapLocationPage />} />
            </Routes>
          </main>
        </div>
      </LoadScript>
    </Router>
  );
}

export default App;

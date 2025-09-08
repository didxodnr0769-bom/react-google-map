import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import MapBasicPage from "./pages/map/MapBasicPage";
import MapMarkerPage from "./pages/map/MapMarkerPage";
import MapLocationPage from "./pages/map/MapLocationPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path={ROUTES.HOME} element={<MainPage />} />
            <Route path={ROUTES.MAP_BASIC} element={<MapBasicPage />} />
            <Route path={ROUTES.MAP_MARKER} element={<MapMarkerPage />} />
            <Route path={ROUTES.MAP_LOCATION} element={<MapLocationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

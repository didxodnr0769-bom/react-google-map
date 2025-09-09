import { GoogleMap } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import "@/pages/map/MapPage.css";

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const MapBasicPage = () => {
  return (
    <div className="map-page">
      <div className="map-page-header">
        <Link to={ROUTES.HOME} className="map-back-link">
          ← 메인 페이지로 돌아가기
        </Link>

        <h1>Map 기본 테스트</h1>
        <p>기본적인 Google Map을 표시하는 테스트 페이지입니다.</p>
      </div>

      <div className="map-container">
        <GoogleMap mapContainerClassName="map-inner" center={center} zoom={10}>
          {/* 기본 지도 표시 */}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapBasicPage;

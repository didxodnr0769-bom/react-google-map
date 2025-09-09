import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import "@/pages/map/MapPage.css";

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const MapMarkerPage = () => {
  return (
    <div className="map-page">
      <div className="map-page-header">
        <Link to={ROUTES.HOME} className="map-back-link">
          ← 메인 페이지로 돌아가기
        </Link>

        <h1>Map Marker 커스텀 테스트</h1>
        <p>커스텀 마커를 사용한 Google Map 테스트 페이지입니다.</p>
      </div>

      <div className="map-container">
        <GoogleMap mapContainerClassName="map-inner" center={center} zoom={12}>
          <Marker position={center} title="서울 중심지" />
          {/* 향후 커스텀 마커 구현 예정 */}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapMarkerPage;

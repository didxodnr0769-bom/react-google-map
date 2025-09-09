import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "@/constants/routes";
import "@/pages/map/MapPage.css";

const defaultCenter = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const MapLocationPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    // 향후 현재 위치 가져오기 구현 예정
    // navigator.geolocation.getCurrentPosition() 사용
  }, []);

  return (
    <div className="map-page">
      <div className="map-page-header">
        <Link to={ROUTES.HOME} className="map-back-link">
          ← 메인 페이지로 돌아가기
        </Link>

        <h1>Map 현재 위치 표시 테스트</h1>
        <p>사용자의 현재 위치를 표시하는 Google Map 테스트 페이지입니다.</p>
      </div>

      <div className="map-container">
        <GoogleMap
          mapContainerClassName="map-inner"
          center={mapCenter}
          zoom={15}
        >
          {currentLocation && (
            <Marker position={currentLocation} title="현재 위치" />
          )}
          {/* 기본 위치 마커 */}
          <Marker position={defaultCenter} title="기본 위치 (서울)" />
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapLocationPage;

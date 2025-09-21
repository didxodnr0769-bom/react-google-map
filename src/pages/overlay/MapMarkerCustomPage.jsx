import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import "@/pages/map/MapPage.css";

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

// 커스텀 마커 데이터
const customMarkers = [
  {
    id: 1,
    position: { lat: 37.5665, lng: 126.978 },
    title: "서울 중심지",
    description: "대한민국의 수도 서울의 중심부입니다.",
    icon: "🏢",
    color: "#667eea",
  },
  {
    id: 2,
    position: { lat: 37.5759, lng: 126.9769 },
    title: "경복궁",
    description: "조선 왕조의 법궁으로 사용된 궁궐입니다.",
    icon: "🏯",
    color: "#f093fb",
  },
  {
    id: 3,
    position: { lat: 37.5663, lng: 126.9779 },
    title: "명동",
    description: "서울의 대표적인 쇼핑 거리입니다.",
    icon: "🛍️",
    color: "#4facfe",
  },
  {
    id: 4,
    position: { lat: 37.5547, lng: 126.9707 },
    title: "N서울타워",
    description: "서울의 랜드마크 타워입니다.",
    icon: "🗼",
    color: "#43e97b",
  },
];

/**
 * 기존 마커를 커스텀하여 사용하는 테스트 페이지입니다.
 */
const MapMarkerCustomPage = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);

  // 커스텀 마커 아이콘 생성
  const createCustomIcon = (icon, color) => ({
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 30 20 30s20-18.954 20-30C40 8.954 31.046 0 20 0z" fill="${color}"/>
        <circle cx="20" cy="20" r="12" fill="white"/>
        <text x="20" y="28" text-anchor="middle" font-size="12" fill="black">${icon}</text>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(40, 50),
    anchor: new window.google.maps.Point(20, 50),
  });

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setMapCenter(marker.position);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="map-page">
      <div className="map-container">
        <GoogleMap
          mapContainerClassName="map-inner"
          center={mapCenter}
          zoom={13}
          options={{
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {/* 커스텀 마커 */}
          {customMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              icon={createCustomIcon(marker.icon, marker.color)}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {/* 선택된 마커의 정보 창 */}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={handleInfoWindowClose}
            >
              <div
                style={{
                  padding: "10px",
                  maxWidth: "200px",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    color: selectedMarker.color,
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {selectedMarker.icon} {selectedMarker.title}
                </h4>
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    color: "#666",
                  }}
                >
                  {selectedMarker.description}
                </p>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#999",
                  }}
                >
                  위도: {selectedMarker.position.lat.toFixed(4)}
                  <br />
                  경도: {selectedMarker.position.lng.toFixed(4)}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapMarkerCustomPage;

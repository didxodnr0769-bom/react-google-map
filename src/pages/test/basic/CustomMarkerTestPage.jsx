// src/pages/test/basic/MarkerTestPage.jsx
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "@/constants/routes";
import "@/pages/map/MapPage.css";
import MarkdownComponent from "@/components/Markdown";

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
    color: "#669966",
  },
  {
    id: 2,
    position: { lat: 37.5759, lng: 126.9769 },
    title: "경복궁",
    description: "조선 왕조의 법궁으로 사용된 궁궐입니다.",
    icon: "🏯",
    color: "#f093fb",
  },
];

const MapMarkerCustomPage = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`/docs/기본_마커_변경_테스트.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

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
    setMapCenter(marker.position);
  };

  return (
    <div className="map-page">
      <div className="map-page-header">
        <Link to={ROUTES.HOME} className="map-back-link">
          ← 메인 페이지로 돌아가기
        </Link>

        <h1>Map 커스텀 마커 테스트</h1>
        <p>
          다양한 커스텀 마커와 정보창을 사용한 Google Map 테스트 페이지입니다.
        </p>
      </div>

      <div
        className="marker-info"
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          border: "1px solid #e9ecef",
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#333" }}>📍 마커 정보</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
          {customMarkers.map((marker) => (
            <div
              key={marker.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px",
                backgroundColor: "white",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: "1px solid #ddd",
              }}
              onClick={() => handleMarkerClick(marker)}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "20px" }}>{marker.icon}</span>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                {marker.title}
              </span>
            </div>
          ))}
        </div>
      </div>

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
        </GoogleMap>
      </div>

      <div className="markdown-container">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default MapMarkerCustomPage;

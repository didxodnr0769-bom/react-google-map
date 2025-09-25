// src/pages/test/basic/CustomMarkerTestPage.jsx.jsx
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
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

const CustomMarkerTestPage = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`/docs/마커_커스텀_테스트.md`)
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
      <div className="map-container">
        <GoogleMap
          mapContainerClassName="map-inner"
          center={mapCenter}
          zoom={14}
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

export default CustomMarkerTestPage;

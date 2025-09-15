// src/pages/test/basic/MarkerTestPage.jsx
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "@/pages/map/MapPage.css";
import MarkdownComponent from "@/components/Markdown";

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const customMarkers = [
  {
    id: 1,
    position: { lat: 37.5665, lng: 126.978 },
    title: "서울 중심지",
    description: "대한민국의 수도 서울의 중심부입니다.",
  },
  {
    id: 2,
    position: { lat: 37.5759, lng: 126.9769 },
    title: "경복궁",
    description: "조선 왕조의 법궁으로 사용된 궁궐입니다.",
  },
];

const MapMarkerCustomPage = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`/docs/기본_마커_변경_테스트.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="map-page">
      <div className="map-page-header">
        <h1>Map 마커 테스트</h1>
        <p>다양한 마커와 정보창을 사용한 Google Map 테스트 페이지입니다.</p>
      </div>

      <div className="map-container">
        <GoogleMap mapContainerClassName="map-inner" center={center} zoom={13}>
          {customMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
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

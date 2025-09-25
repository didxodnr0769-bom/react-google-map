// src/pages/overlay/PolygonTestPage.jsx
import { GoogleMap, Polygon } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import MarkdownComponent from "@/components/Markdown";
import "@/pages/map/MapPage.css";

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

// 폴리곤 영역 데이터
const polygonPaths = [
  // 서울 중심 구역
  {
    id: 1,
    paths: [
      { lat: 37.56, lng: 126.97 },
      { lat: 37.57, lng: 126.97 },
      { lat: 37.57, lng: 126.985 },
      { lat: 37.56, lng: 126.985 },
      { lat: 37.56, lng: 126.97 }, // 닫힌 영역
    ],
    fillColor: "#FF0000",
    fillOpacity: 0.3,
    strokeColor: "#FF0000",
    strokeWeight: 2,
    strokeOpacity: 0.8,
    title: "서울 중심 구역",
    description: "서울의 중심부를 나타내는 영역입니다.",
  },
  // 한강 북쪽 구역
  {
    id: 2,
    paths: [
      { lat: 37.52, lng: 126.97 },
      { lat: 37.55, lng: 126.97 },
      { lat: 37.55, lng: 126.985 },
      { lat: 37.52, lng: 126.985 },
      { lat: 37.52, lng: 126.97 },
    ],
    fillColor: "#0000FF",
    fillOpacity: 0.2,
    strokeColor: "#0000FF",
    strokeWeight: 3,
    strokeOpacity: 0.6,
    title: "한강 북쪽 구역",
    description: "한강 북쪽 지역을 나타내는 영역입니다.",
  },
  // 삼각형 구역
  {
    id: 3,
    paths: [
      { lat: 37.57, lng: 126.97 },
      { lat: 37.58, lng: 126.975 },
      { lat: 37.57, lng: 126.98 },
      { lat: 37.57, lng: 126.97 },
    ],
    fillColor: "#00FF00",
    fillOpacity: 0.4,
    strokeColor: "#00FF00",
    strokeWeight: 2,
    strokeOpacity: 0.7,
    title: "삼각형 구역",
    description: "삼각형 모양의 영역입니다.",
  },
  // 복잡한 다각형 구역
  {
    id: 4,
    paths: [
      { lat: 37.54, lng: 126.97 },
      { lat: 37.545, lng: 126.972 },
      { lat: 37.55, lng: 126.97 },
      { lat: 37.555, lng: 126.975 },
      { lat: 37.55, lng: 126.98 },
      { lat: 37.545, lng: 126.978 },
      { lat: 37.54, lng: 126.97 },
    ],
    fillColor: "#FF00FF",
    fillOpacity: 0.25,
    strokeColor: "#FF00FF",
    strokeWeight: 2,
    strokeOpacity: 0.8,
    title: "복잡한 다각형 구역",
    description: "복잡한 모양의 다각형 영역입니다.",
  },
];

const mapOptions = {
  gestureHandling: "greedy",
  zoomControl: false,
  scaleControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  disableDefaultUI: true,
  scrollwheel: true,
  draggable: true,
  clickableIcons: false,
};

/**
 * 폴리곤 테스트 페이지입니다.
 *  - 다양한 스타일의 폴리곤을 표시합니다.
 *  - 폴리곤 클릭시 정보를 표시합니다.
 */
const PolygonTestPage = () => {
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [markdown, setMarkdown] = useState("");

  const handlePolygonClick = (polygon) => {
    setSelectedPolygon(polygon);
  };

  // 마크다운 문서 로드
  useEffect(() => {
    fetch(`/docs/오버레이/폴리곤_테스트.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="map-page">
      <div className="map-container">
        <GoogleMap
          mapContainerClassName="map-inner"
          center={center}
          zoom={12}
          options={mapOptions}
        >
          {/* 폴리곤 렌더링 */}
          {polygonPaths.map((polygon) => (
            <Polygon
              key={polygon.id}
              paths={polygon.paths}
              options={{
                fillColor: polygon.fillColor,
                fillOpacity: polygon.fillOpacity,
                strokeColor: polygon.strokeColor,
                strokeWeight: polygon.strokeWeight,
                strokeOpacity: polygon.strokeOpacity,
                clickable: true,
              }}
              onClick={() => handlePolygonClick(polygon)}
            />
          ))}

          {/* 선택된 폴리곤 정보 표시 */}
          {selectedPolygon && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "white",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1000,
                maxWidth: "300px",
                border: "1px solid #ddd",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                {selectedPolygon.title}
              </h3>
              <p
                style={{ margin: "0 0 8px 0", color: "#666", fontSize: "14px" }}
              >
                {selectedPolygon.description}
              </p>
              <div style={{ marginBottom: "10px" }}>
                <p style={{ margin: "2px 0", fontSize: "13px" }}>
                  <strong>채우기 색상:</strong> {selectedPolygon.fillColor}
                </p>
                <p style={{ margin: "2px 0", fontSize: "13px" }}>
                  <strong>채우기 투명도:</strong> {selectedPolygon.fillOpacity}
                </p>
                <p style={{ margin: "2px 0", fontSize: "13px" }}>
                  <strong>테두리 색상:</strong> {selectedPolygon.strokeColor}
                </p>
                <p style={{ margin: "2px 0", fontSize: "13px" }}>
                  <strong>테두리 두께:</strong> {selectedPolygon.strokeWeight}px
                </p>
                <p style={{ margin: "2px 0", fontSize: "13px" }}>
                  <strong>테두리 투명도:</strong>{" "}
                  {selectedPolygon.strokeOpacity}
                </p>
              </div>
              <button
                onClick={() => setSelectedPolygon(null)}
                style={{
                  padding: "8px 16px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                닫기
              </button>
            </div>
          )}
        </GoogleMap>
      </div>

      {/* 마크다운 문서 표시 */}
      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default PolygonTestPage;

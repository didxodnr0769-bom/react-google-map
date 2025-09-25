// src/pages/overlay/PollylineTestPage.jsx
import { GoogleMap, Polyline } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import MarkdownComponent from "@/components/Markdown";
import "@/pages/map/MapPage.css";

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

// 폴리라인 경로 데이터
const polylinePaths = [
  // 서울 주요 관광지 경로
  {
    id: 1,
    path: [
      { lat: 37.5665, lng: 126.978 }, // 서울 중심지
      { lat: 37.5759, lng: 126.9769 }, // 경복궁
      { lat: 37.5796, lng: 126.977 }, // 청와대
      { lat: 37.5663, lng: 126.9779 }, // 명동
      { lat: 37.5665, lng: 126.978 }, // 서울 중심지 (순환)
    ],
    color: "#FF0000",
    weight: 3,
    opacity: 0.8,
    title: "서울 관광지 순환 경로",
  },
  // 한강 경로
  {
    id: 2,
    path: [
      { lat: 37.52, lng: 126.978 }, // 한강공원
      { lat: 37.53, lng: 126.978 },
      { lat: 37.54, lng: 126.978 },
      { lat: 37.55, lng: 126.978 },
    ],
    color: "#0000FF",
    weight: 4,
    opacity: 0.6,
    title: "한강 경로",
  },
  // 지그재그 경로
  {
    id: 3,
    path: [
      { lat: 37.56, lng: 126.97 },
      { lat: 37.565, lng: 126.975 },
      { lat: 37.57, lng: 126.97 },
      { lat: 37.575, lng: 126.975 },
      { lat: 37.58, lng: 126.97 },
    ],
    color: "#00FF00",
    weight: 2,
    opacity: 0.7,
    title: "지그재그 경로",
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
 * 폴리라인 테스트 페이지입니다.
 *  - 다양한 스타일의 폴리라인을 표시합니다.
 *  - 폴리라인 클릭시 정보를 표시합니다.
 */
const PollylineTestPage = () => {
  const [selectedPolyline, setSelectedPolyline] = useState(null);
  const [markdown, setMarkdown] = useState("");

  const handlePolylineClick = (polyline) => {
    setSelectedPolyline(polyline);
  };

  // 마크다운 문서 로드
  useEffect(() => {
    fetch(`/docs/오버레이/폴리라인_테스트.md`)
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
          {/* 폴리라인 렌더링 */}
          {polylinePaths.map((polyline) => (
            <Polyline
              key={polyline.id}
              path={polyline.path}
              options={{
                strokeColor: polyline.color,
                strokeWeight: polyline.weight,
                strokeOpacity: polyline.opacity,
                clickable: true,
              }}
              onClick={() => handlePolylineClick(polyline)}
            />
          ))}

          {/* 선택된 폴리라인 정보 표시 */}
          {selectedPolyline && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                zIndex: 1000,
              }}
            >
              <h3>{selectedPolyline.title}</h3>
              <p>색상: {selectedPolyline.color}</p>
              <p>두께: {selectedPolyline.weight}px</p>
              <p>투명도: {selectedPolyline.opacity}</p>
              <button
                onClick={() => setSelectedPolyline(null)}
                style={{
                  marginTop: "5px",
                  padding: "5px 10px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
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

export default PollylineTestPage;

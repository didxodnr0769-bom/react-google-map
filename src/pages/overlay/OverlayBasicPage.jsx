// src/pages/overlay/OverlayBasicPage.jsx
import { GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import CustomMarker from "@/components/overlay/CustomMarker";
import CustomInfoWindow from "@/components/overlay/CustomInfoWindow";
import MarkdownComponent from "@/components/Markdown";
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
];

const mapOptions = {
  gestureHandling: "greedy",

  // map UI 숨김 처리
  zoomControl: false,
  scaleControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  disableDefaultUI: true,

  // 상호작용 처리
  scrollwheel: true,
  draggable: true,
  clickableIcons: false,
};

/**
 * 오버레이 기본 테스트 페이지입니다.
 *  - 마커를 클릭시 정보 창이 표시됩니다.
 */
const OverlayBasicPage = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [markdown, setMarkdown] = useState("");

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setMapCenter(marker.position);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  // 마크다운 문서 로드
  useEffect(() => {
    fetch(`/docs/오버레이/오버레이_표출.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="map-page">
      <div className="map-container">
        <GoogleMap
          mapContainerClassName="map-inner"
          center={mapCenter}
          zoom={13}
          options={mapOptions}
        >
          {/* 커스텀 마커 */}
          {customMarkers.map((marker) => (
            <CustomMarker
              key={marker.id}
              marker={marker}
              onMarkerClick={handleMarkerClick}
            />
          ))}

          {/* 선택된 마커의 정보 창 */}
          <CustomInfoWindow
            selectedMarker={selectedMarker}
            onClose={handleInfoWindowClose}
          />
        </GoogleMap>
      </div>

      {/* 마크다운 문서 표시 */}
      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default OverlayBasicPage;

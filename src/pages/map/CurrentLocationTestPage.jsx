import { GoogleMap, Marker } from "@react-google-maps/api";
import "@/pages/map/MapPage.css";
import MarkdownComponent from "@/components/Markdown";
import { useState, useEffect } from "react";

const CurrentLocationTestPage = () => {
  const [markdown, setMarkdown] = useState("");
  const [currentPosition, setCurrentPosition] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetch(`/docs/맵/현재위치_테스트.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));

    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError(`위치 정보를 가져올 수 없습니다: ${error.message}`);
          // 기본 위치로 설정 (서울)
          setCurrentPosition({
            lat: 37.5665,
            lng: 126.978,
          });
        },
      );
    } else {
      setError("브라우저에서 위치 정보를 지원하지 않습니다.");
      setCurrentPosition({
        lat: 37.5665,
        lng: 126.978,
      });
    }
  }, []);

  return (
    <div className="map-page">
      <div className="map-container">
        {currentPosition && (
          <GoogleMap
            mapContainerClassName="map-inner"
            center={currentPosition}
            zoom={15}
            options={mapOptions}
          >
            <Marker position={currentPosition} title="현재 위치" />
          </GoogleMap>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default CurrentLocationTestPage;

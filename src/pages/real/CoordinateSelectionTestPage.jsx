// @src/pages/real/CoordinateSelectionTestPage.jsx
import { GoogleMap, Circle, Marker } from "@react-google-maps/api";
import "@/pages/map/MapPage.css";
import MarkdownComponent from "@/components/Markdown";
import React, { useState, useEffect } from "react";

const CoordinateSelectionTestPage = () => {
  const [markdown, setMarkdown] = useState("");
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [radius, setRadius] = useState(500);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  const mapOptions = {
    gestureHandling: "greedy",
    zoomControl: true,
    scaleControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    clickableIcons: false,
  };

  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.15,
  };

  useEffect(() => {
    fetch(`/docs/실전기능/영역제한_테스트.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
      .catch(() =>
        setMarkdown("# 영역 제한 테스트\n\n문서를 로드할 수 없습니다."),
      );
  }, []);

  const handleMapClick = (event) => {
    const coordinate = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedCoordinate(coordinate);
    setMapCenter(coordinate);
  };

  const clearSelection = () => {
    setSelectedCoordinate(null);
  };

  const formatCoordinate = (coord) => {
    if (!coord) return "선택된 좌표가 없습니다";
    return `위도: ${coord.lat.toFixed(6)}, 경도: ${coord.lng.toFixed(6)}`;
  };

  const handleRadiusChange = (event) => {
    setRadius(parseInt(event.target.value));
  };

  console.log(JSON.stringify(selectedCoordinate));
  return (
    <div className="map-page">
      <div className="map-container">
        <div
          className="controls"
          style={{
            padding: "10px",
            backgroundColor: "#f5f5f5",
            marginBottom: "10px",
          }}
        >
          <div style={{ marginBottom: "10px", fontSize: "14px" }}>
            <strong>선택된 좌표:</strong> {formatCoordinate(selectedCoordinate)}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              반경: {radius}m
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={radius}
              onChange={handleRadiusChange}
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "#ddd",
                outline: "none",
                marginRight: "10px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#666",
                marginTop: "2px",
              }}
            >
              <span>100m</span>
              <span>2000m</span>
            </div>
          </div>

          <button
            onClick={clearSelection}
            disabled={!selectedCoordinate}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: selectedCoordinate ? "pointer" : "not-allowed",
              opacity: selectedCoordinate ? 1 : 0.5,
            }}
          >
            선택 초기화
          </button>
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
            지도를 클릭하여 좌표를 선택하고, 슬라이더로 반경을 조정하세요.
          </div>
        </div>

        <GoogleMap
          mapContainerClassName="map-inner"
          center={mapCenter}
          zoom={15}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {selectedCoordinate && (
            <React.Fragment>
              <Marker
                position={selectedCoordinate}
                title={`선택된 좌표: ${formatCoordinate(selectedCoordinate)}`}
                icon={{
                  url: "data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='12' cy='12' r='10' fill='%23FF0000' stroke='%23FFFFFF' stroke-width='2'/%3e%3c/svg%3e",
                  scaledSize: new window.google.maps.Size(24, 24),
                  anchor: new window.google.maps.Point(12, 12),
                }}
              />
              <Circle
                center={selectedCoordinate}
                radius={radius}
                options={circleOptions}
              />
            </React.Fragment>
          )}
        </GoogleMap>
      </div>

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default CoordinateSelectionTestPage;

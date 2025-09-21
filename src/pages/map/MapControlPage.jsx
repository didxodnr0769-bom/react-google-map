// @src/pages/map/MapControlPage.jsx
import { GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import MarkdownComponent from "@/components/Markdown";

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const MapControlPage = () => {
  const [markdown, setMarkdown] = useState("");
  const [map, setMap] = useState(null);
  const [mapOptions, setMapOptions] = useState({
    gestureHandling: "greedy",
    zoomControl: false,
    scaleControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    clickableIcons: true,
  });
  const [zoom, setZoom] = useState(10);
  const [mapType, setMapType] = useState("roadmap");

  useEffect(() => {
    fetch(`/docs/맵_컨트롤.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const toggleOption = (optionName) => {
    setMapOptions((prev) => ({
      ...prev,
      [optionName]: !prev[optionName],
    }));
  };

  const changeGestureHandling = () => {
    setMapOptions((prev) => ({
      ...prev,
      gestureHandling:
        prev.gestureHandling === "greedy" ? "cooperative" : "greedy",
    }));
  };

  const changeZoom = (newZoom) => {
    setZoom(newZoom);
    if (map) {
      map.setZoom(newZoom);
    }
  };

  const changeMapType = (type) => {
    setMapType(type);
    if (map) {
      map.setMapTypeId(type);
    }
  };

  const moveToLocation = (lat, lng, zoomLevel = 15) => {
    if (map) {
      map.panTo({ lat, lng });
      map.setZoom(zoomLevel);
    }
  };

  const controlButtonStyle = {
    margin: "2px",
    padding: "8px 12px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    transition: "all 0.2s",
  };

  const activeButtonStyle = {
    ...controlButtonStyle,
    backgroundColor: "#4285f4",
    color: "white",
    borderColor: "#4285f4",
  };

  const controlPanelStyle = {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    border: "1px solid #e0e0e0",
  };

  return (
    <div className="map-page">
      <h1>Map Control 테스트</h1>

      {/* 지도 영역 밖에 있는 컨트롤 패널 */}
      <div style={controlPanelStyle}>
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          지도 컨트롤 테스트
        </h3>

        {/* 기본 컨트롤 버튼들 */}
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ margin: "0 0 5px 0", fontSize: "12px" }}>기본 컨트롤</h4>
          <button
            style={
              mapOptions.zoomControl ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => toggleOption("zoomControl")}
          >
            줌 버튼 {mapOptions.zoomControl ? "ON" : "OFF"}
          </button>
          <button
            style={
              mapOptions.scaleControl ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => toggleOption("scaleControl")}
          >
            눈금 {mapOptions.scaleControl ? "ON" : "OFF"}
          </button>
          <button
            style={
              mapOptions.mapTypeControl ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => toggleOption("mapTypeControl")}
          >
            지도유형 {mapOptions.mapTypeControl ? "ON" : "OFF"}
          </button>
          <button
            style={
              mapOptions.streetViewControl
                ? activeButtonStyle
                : controlButtonStyle
            }
            onClick={() => toggleOption("streetViewControl")}
          >
            스트리트뷰 {mapOptions.streetViewControl ? "ON" : "OFF"}
          </button>
          <button
            style={
              mapOptions.fullscreenControl
                ? activeButtonStyle
                : controlButtonStyle
            }
            onClick={() => toggleOption("fullscreenControl")}
          >
            전체화면 {mapOptions.fullscreenControl ? "ON" : "OFF"}
          </button>
          <button
            style={
              mapOptions.disableDefaultUI
                ? activeButtonStyle
                : controlButtonStyle
            }
            onClick={() => toggleOption("disableDefaultUI")}
          >
            기본UI 숨기기 {mapOptions.disableDefaultUI ? "ON" : "OFF"}
          </button>
        </div>

        {/* 상호작용 컨트롤 */}
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ margin: "0 0 5px 0", fontSize: "12px" }}>상호작용</h4>
          <button style={controlButtonStyle} onClick={changeGestureHandling}>
            터치모드: {mapOptions.gestureHandling}
          </button>
          <button
            style={
              mapOptions.scrollwheel ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => toggleOption("scrollwheel")}
          >
            스크롤줌 {mapOptions.scrollwheel ? "ON" : "OFF"}
          </button>
          <button
            style={
              mapOptions.draggable ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => toggleOption("draggable")}
          >
            드래그 {mapOptions.draggable ? "ON" : "OFF"}
          </button>
          <button
            style={
              mapOptions.clickableIcons ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => toggleOption("clickableIcons")}
          >
            아이콘클릭 {mapOptions.clickableIcons ? "ON" : "OFF"}
          </button>
        </div>

        {/* 줌 레벨 컨트롤 */}
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ margin: "0 0 5px 0", fontSize: "12px" }}>
            줌 레벨: {zoom}
          </h4>
          <button style={controlButtonStyle} onClick={() => changeZoom(5)}>
            5
          </button>
          <button style={controlButtonStyle} onClick={() => changeZoom(10)}>
            10
          </button>
          <button style={controlButtonStyle} onClick={() => changeZoom(15)}>
            15
          </button>
          <button style={controlButtonStyle} onClick={() => changeZoom(20)}>
            20
          </button>
        </div>

        {/* 지도 타입 컨트롤 */}
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ margin: "0 0 5px 0", fontSize: "12px" }}>지도 타입</h4>
          <button
            style={
              mapType === "roadmap" ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => changeMapType("roadmap")}
          >
            일반
          </button>
          <button
            style={
              mapType === "satellite" ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => changeMapType("satellite")}
          >
            위성
          </button>
          <button
            style={
              mapType === "hybrid" ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => changeMapType("hybrid")}
          >
            하이브리드
          </button>
          <button
            style={
              mapType === "terrain" ? activeButtonStyle : controlButtonStyle
            }
            onClick={() => changeMapType("terrain")}
          >
            지형
          </button>
        </div>

        {/* 위치 이동 컨트롤 */}
        <div>
          <h4 style={{ margin: "0 0 5px 0", fontSize: "12px" }}>위치 이동</h4>
          <button
            style={controlButtonStyle}
            onClick={() => moveToLocation(37.5665, 126.978, 12)}
          >
            서울
          </button>
          <button
            style={controlButtonStyle}
            onClick={() => moveToLocation(35.1796, 129.0756, 12)}
          >
            부산
          </button>
          <button
            style={controlButtonStyle}
            onClick={() => moveToLocation(37.4563, 126.7052, 12)}
          >
            인천
          </button>
          <button
            style={controlButtonStyle}
            onClick={() => moveToLocation(35.8714, 128.6014, 12)}
          >
            대구
          </button>
        </div>
      </div>

      <div className="map-container">
        {/* 지도 영역 */}
        <GoogleMap
          mapContainerClassName="map-inner"
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapTypeId={mapType}
          options={mapOptions}
        />
      </div>

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default MapControlPage;

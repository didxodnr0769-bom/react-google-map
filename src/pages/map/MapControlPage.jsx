import { GoogleMap } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const MapControlPage = () => {
  const [map, setMap] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Map Control 테스트</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          // 터치 이벤트 처리 방식 (none: 터치 이벤트 무시, greedy: 터치 이벤트 처리)
          gestureHandling: "greedy",
          // Zoom 조절 버튼 표시 여부
          zoomControl: false,
          // 눈금 표시 버튼 표시 여부
          scaleControl: true,
          // 지도 유형 선택 버튼 표시 여부
          mapTypeControl: false,
          // 스트리트 뷰 버튼 표시 여부
          streetViewControl: false,
          // 전체 화면 버튼 표시 여부
          fullscreenControl: false,
          // 최소 줌 레벨
          //   minZoom: 1,
          // 최대 줌 레벨
          //   maxZoom: 1,
        }}
      ></GoogleMap>
    </div>
  );
};

export default MapControlPage;

import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const MapPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Google Maps with React</h1>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* 마커나 다른 컴포넌트들을 여기에 추가할 수 있습니다 */}
      </GoogleMap>
    </div>
  );
};

export default MapPage;

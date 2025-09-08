import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const MapMarkerPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Link
        to={ROUTES.HOME}
        style={{
          color: "#667eea",
          textDecoration: "none",
          fontSize: "16px",
          marginBottom: "20px",
          display: "inline-block",
        }}
      >
        ← 메인 페이지로 돌아가기
      </Link>

      <h1>Map Marker 커스텀 테스트</h1>
      <p>커스텀 마커를 사용한 Google Map 테스트 페이지입니다.</p>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} title="서울 중심지" />
        {/* 향후 커스텀 마커 구현 예정 */}
      </GoogleMap>
    </div>
  );
};

export default MapMarkerPage;

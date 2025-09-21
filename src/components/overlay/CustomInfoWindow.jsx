// src/components/overlay/CustomInfoWindow.jsx
import { InfoWindow } from "@react-google-maps/api";

/**
 * 커스텀 정보창 컴포넌트
 * @param {Object} selectedMarker - 선택된 마커 데이터
 * @param {Function} onClose - 정보창 닫기 핸들러
 */
const CustomInfoWindow = ({ selectedMarker, onClose }) => {
  if (!selectedMarker) return null;

  return (
    <InfoWindow
      position={selectedMarker.position}
      onCloseClick={onClose}
      options={{
        // 정보창 위치 조정
        pixelOffset: new window.google.maps.Size(0, -50),
      }}
    >
      <div
        style={{
          padding: "10px",
          maxWidth: "200px",
        }}
      >
        <h4
          style={{
            margin: "0 0 8px 0",
            color: selectedMarker.color,
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {selectedMarker.icon} {selectedMarker.title}
        </h4>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            lineHeight: "1.4",
            color: "#666",
          }}
        >
          {selectedMarker.description}
        </p>
        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "#999",
          }}
        >
          위도: {selectedMarker.position.lat.toFixed(4)}
          <br />
          경도: {selectedMarker.position.lng.toFixed(4)}
        </div>
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;

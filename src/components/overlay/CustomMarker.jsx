// src/components/overlay/CustomMarker.jsx
import { Marker } from "@react-google-maps/api";

/**
 * 커스텀 마커 컴포넌트
 * @param {Object} marker - 마커 데이터 객체
 * @param {Function} onMarkerClick - 마커 클릭 핸들러
 */
const CustomMarker = ({ marker, onMarkerClick }) => {
  // 커스텀 마커 아이콘 생성
  const createCustomIcon = (icon, color) => ({
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 30 20 30s20-18.954 20-30C40 8.954 31.046 0 20 0z" fill="${color}"/>
        <circle cx="20" cy="20" r="12" fill="white"/>
        <text x="20" y="28" text-anchor="middle" font-size="12" fill="black">${icon}</text>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(40, 50),
    anchor: new window.google.maps.Point(20, 50),
  });

  return (
    <Marker
      key={marker.id}
      position={marker.position}
      title={marker.title}
      icon={createCustomIcon(marker.icon, marker.color)}
      onClick={() => onMarkerClick(marker)}
    />
  );
};

export default CustomMarker;

// @src/pages/real/PathTrackingTestPage.jsx
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import "@/pages/map/MapPage.css";
import MarkdownComponent from "@/components/Markdown";
import { useState, useEffect, useRef } from "react";

const PathTrackingTestPage = () => {
  const [markdown, setMarkdown] = useState("");
  const [currentPosition, setCurrentPosition] = useState(null);
  const [path, setPath] = useState([]);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const intervalRef = useRef(null);
  const watchIdRef = useRef(null);

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

  const polylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  useEffect(() => {
    fetch(`/docs/실전기능/경로추적_테스트.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
      .catch(() =>
        setMarkdown("# 경로 추적 테스트\n\n문서를 로드할 수 없습니다."),
      );

    return () => {
      stopTracking();
    };
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("브라우저에서 위치 정보를 지원하지 않습니다."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(newPosition);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    });
  };

  const startTracking = async () => {
    try {
      const initialPosition = await getCurrentPosition();
      setCurrentPosition(initialPosition);
      setPath([initialPosition]);
      setIsTracking(true);
      setError(null);

      intervalRef.current = setInterval(async () => {
        try {
          const newPosition = await getCurrentPosition();
          setCurrentPosition(newPosition);
          setPath((prevPath) => [...prevPath, newPosition]);
        } catch (err) {
          setError(`위치 업데이트 오류: ${err.message}`);
        }
      }, 1000);
    } catch (err) {
      setError(`추적 시작 오류: ${err.message}`);
      setCurrentPosition({
        lat: 37.5665,
        lng: 126.978,
      });
    }
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  };

  const clearPath = () => {
    setPath([]);
    if (currentPosition) {
      setPath([currentPosition]);
    }
  };

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
          <button
            onClick={isTracking ? stopTracking : startTracking}
            style={{
              padding: "8px 16px",
              marginRight: "10px",
              backgroundColor: isTracking ? "#ff4444" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isTracking ? "추적 중지" : "추적 시작"}
          </button>
          <button
            onClick={clearPath}
            disabled={path.length === 0}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: path.length === 0 ? "not-allowed" : "pointer",
              opacity: path.length === 0 ? 0.5 : 1,
            }}
          >
            경로 초기화
          </button>
          <span style={{ marginLeft: "20px", fontSize: "14px" }}>
            추적된 포인트: {path.length}개
          </span>
          {isTracking && (
            <span
              style={{ marginLeft: "10px", color: "#4CAF50", fontSize: "14px" }}
            >
              ● 실시간 추적 중
            </span>
          )}
        </div>

        {currentPosition && (
          <GoogleMap
            mapContainerClassName="map-inner"
            center={currentPosition}
            zoom={15}
            options={mapOptions}
          >
            <Marker
              position={currentPosition}
              title="현재 위치"
              icon={{
                url: "data:image/svg+xml;charset=UTF-8,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='10' cy='10' r='8' fill='%23FF0000' stroke='%23FFFFFF' stroke-width='2'/%3e%3c/svg%3e",
                scaledSize: new window.google.maps.Size(20, 20),
                anchor: new window.google.maps.Point(10, 10),
              }}
            />
            {path.length > 1 && (
              <Polyline path={path} options={polylineOptions} />
            )}
          </GoogleMap>
        )}
        {error && (
          <div
            className="error-message"
            style={{ color: "red", padding: "10px" }}
          >
            {error}
          </div>
        )}
      </div>

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default PathTrackingTestPage;

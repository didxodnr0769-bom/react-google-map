import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import MarkdownComponent from "@/components/Markdown";
import "@/pages/map/MapPage.css";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.5547, // 서울역 위도
  lng: 126.9723, // 서울역 경도
};

const libraries = ["places", "directions"];

const MapDirectionsPage = () => {
  const [response, setResponse] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const hasSearched = useRef(false);

  // Google Maps API 로드
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    libraries,
  });

  // 한국 지역 특수 처리 경로 검색 함수
  const searchDirections = useCallback(() => {
    if (!isLoaded || isCalculating) return;

    setIsCalculating(true);

    const directionsService = new google.maps.DirectionsService();

    // 대중교통 모드로 경로 검색
    const requests = [
      {
        origin: { lat: 37.5666, lng: 126.9783 }, // 서울역 좌표
        destination: { lat: 37.43, lng: 127.1287 }, // 모란역 좌표
        travelMode: google.maps.TravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
    ];

    const tryRequest = (requestIndex) => {
      if (requestIndex >= requests.length) {
        setIsCalculating(false);

        return;
      }

      const request = requests[requestIndex];
      console.log(`경로 검색 시도 ${requestIndex + 1}:`, request);

      directionsService.route(request, (result, status) => {
        console.log(`시도 ${requestIndex + 1} 응답:`, { status, result });

        if (status === "OK") {
          setIsCalculating(false);
          setResponse(result);
          console.log(`시도 ${requestIndex + 1} 성공:`, result);
        } else {
          console.log(`시도 ${requestIndex + 1} 실패, 다음 방법 시도...`);
          tryRequest(requestIndex + 1);
        }
      });
    };

    tryRequest(0);
  }, [isLoaded, isCalculating]);

  // 마크다운 문서 로드
  useEffect(() => {
    fetch(`/docs/맵/맵_컨트롤.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  // 초기 로드 시 한 번만 검색
  useEffect(() => {
    if (isLoaded && !hasSearched.current) {
      hasSearched.current = true;
      searchDirections();
    }
  }, [isLoaded, searchDirections]);

  // 경로 재검색 함수
  const recalculateRoute = useCallback(() => {
    setResponse(null);
    searchDirections();
  }, [searchDirections]);

  if (!isLoaded) {
    return <div>지도를 로딩 중입니다...</div>;
  }

  return (
    <div className="map-page">
      <div style={{ marginBottom: "10px" }}>
        <h3>대중교통 경로 검색 (서울역 → 모란역)</h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
          대중교통 모드로 경로를 검색합니다. 한국에서 Google Directions API는
          제한적으로 지원됩니다.
        </p>
        {isCalculating && <p>경로를 계산 중입니다...</p>}

        {response && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            <p>경로 검색 완료!</p>
            <p>거리: {response.routes[0].legs[0].distance?.text}</p>
            <p>소요 시간: {response.routes[0].legs[0].duration?.text}</p>
            <button onClick={recalculateRoute}>경로 재검색</button>
          </div>
        )}
      </div>

      <div className="map-container">
        <GoogleMap mapContainerClassName="map-inner" center={center} zoom={7}>
          {response && (
            <DirectionsRenderer
              directions={response}
              options={{
                suppressMarkers: false,
                suppressInfoWindows: false,
              }}
            />
          )}
        </GoogleMap>
      </div>

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default MapDirectionsPage;

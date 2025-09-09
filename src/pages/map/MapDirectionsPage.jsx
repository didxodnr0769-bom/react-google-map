import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

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
  const [error, setError] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
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
    setError(null);

    const directionsService = new google.maps.DirectionsService();

    // 한국에서 작동하는 방법들 시도
    const requests = [
      // 방법 1: region 제거, 영문 주소 사용
      {
        origin: "37.5666,126.9783", // 좌표를 문자열로
        destination: "37.5511,126.9882",
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      // 방법 2: 영문 place name 사용
      {
        origin: "Seoul Station, Seoul, South Korea",
        destination: "Myeong-dong Station, Seoul, South Korea",
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      // 방법 3: 대중교통 모드 시도
      {
        origin: { lat: 37.5666, lng: 126.9783 }, // 서울역 좌표
        destination: { lat: 37.43, lng: 127.1287 }, // 모란역 좌표
        travelMode: google.maps.TravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
    ];

    let currentRequestIndex = 0;

    const tryRequest = (requestIndex) => {
      if (requestIndex >= requests.length) {
        setIsCalculating(false);
        setError(
          "모든 방법을 시도했지만 한국에서 경로를 찾을 수 없습니다. Google Directions API는 한국에서 제한적으로 지원됩니다.",
        );
        return;
      }

      const request = requests[requestIndex];
      console.log(`경로 검색 시도 ${requestIndex + 1}:`, request);

      directionsService.route(request, (result, status) => {
        console.log(`시도 ${requestIndex + 1} 응답:`, { status, result });

        if (status === "OK") {
          setIsCalculating(false);
          setResponse(result);
          setError(null);
          console.log(`시도 ${requestIndex + 1} 성공:`, result);
        } else {
          console.log(`시도 ${requestIndex + 1} 실패, 다음 방법 시도...`);
          tryRequest(requestIndex + 1);
        }
      });
    };

    tryRequest(0);
  }, [isLoaded, isCalculating]);

  // 초기 로드 시 한 번만 검색
  useEffect(() => {
    if (isLoaded && !hasSearched.current) {
      hasSearched.current = true;
      searchDirections();
    }
  }, [isLoaded, searchDirections]);

  // 미국 좌표로 테스트 (API 기본 동작 확인)
  const searchWithUSCoordinates = useCallback(() => {
    if (!isLoaded || isCalculating) return;

    setIsCalculating(true);
    setError(null);

    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin: { lat: 37.7749, lng: -122.4194 }, // 샌프란시스코
      destination: { lat: 37.3382, lng: -121.8863 }, // 산호세
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    };

    console.log("미국 좌표로 경로 검색 요청:", request);

    directionsService.route(request, (result, status) => {
      setIsCalculating(false);

      console.log("미국 좌표 Directions API 응답:", { status, result });

      if (status === "OK") {
        setResponse(result);
        setError(null);
        console.log("미국 좌표로 경로 검색 성공:", result);
      } else {
        console.error("미국 좌표로 경로 검색 실패:", status, result);
        setError(`미국 좌표 테스트 실패: ${status}`);
      }
    });
  }, [isLoaded, isCalculating]);

  // 문자열 주소로 시도하는 함수
  const searchWithStringAddress = useCallback(() => {
    if (!isLoaded || isCalculating) return;

    setIsCalculating(true);
    setError(null);

    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin: "Seoul City Hall, Seoul, South Korea",
      destination: "N Seoul Tower, Seoul, South Korea",
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      region: "KR",
    };

    console.log("문자열 주소로 경로 검색 요청:", request);

    directionsService.route(request, (result, status) => {
      setIsCalculating(false);

      console.log("문자열 주소 Directions API 응답:", { status, result });

      if (status === "OK") {
        setResponse(result);
        setError(null);
        console.log("문자열 주소로 경로 검색 성공:", result);
      } else {
        console.error("문자열 주소로 경로 검색 실패:", status, result);
        let errorMessage = "문자열 주소로도 경로를 찾을 수 없습니다.";

        switch (status) {
          case "ZERO_RESULTS":
            errorMessage =
              "문자열 주소로도 경로를 찾을 수 없습니다. API 설정을 확인해주세요.";
            break;
          case "REQUEST_DENIED":
            errorMessage =
              "API 요청이 거부되었습니다. Directions API 활성화 및 API 키 권한을 확인해주세요.";
            break;
          default:
            errorMessage = `문자열 주소 검색 오류: ${status}`;
        }

        setError(errorMessage);
      }
    });
  }, [isLoaded, isCalculating]);

  // 카카오맵 API 대안 제안 함수
  const showKakaoMapAlternative = useCallback(() => {
    setError(`
      Google Directions API는 한국에서 제한적으로 지원됩니다.
      
      한국 지역 경로 검색을 위한 대안:
      1. 카카오맵 API (https://apis.map.kakao.com/)
      2. 네이버맵 API (https://navermaps.github.io/)
      3. 공공데이터포털 교통 API
      
      이들은 한국 도로망을 완벽하게 지원합니다.
    `);
  }, []);

  // 경로 재검색 함수
  const recalculateRoute = useCallback(() => {
    setResponse(null);
    setError(null);
    searchDirections();
  }, [searchDirections]);

  if (!isLoaded) {
    return <div>지도를 로딩 중입니다...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <h3>한국 경로 검색 (여러 방법 시도)</h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
          한국에서 Google Directions API는 제한적입니다. 여러 방법을 순차적으로
          시도합니다.
        </p>
        {isCalculating && <p>경로를 계산 중입니다...</p>}
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            <p>오류: {error}</p>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={recalculateRoute}
                style={{ marginRight: "10px" }}
              >
                한국 좌표로 다시 시도
              </button>
              <button
                onClick={searchWithStringAddress}
                style={{ marginRight: "10px" }}
              >
                문자열 주소로 시도
              </button>
              <button onClick={searchWithUSCoordinates}>
                미국 좌표로 테스트
              </button>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={showKakaoMapAlternative}
                style={{
                  backgroundColor: "#FEE500",
                  color: "#000",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                🗺️ 한국 지역 경로 검색 대안 보기
              </button>
            </div>
          </div>
        )}
        {response && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            <p>경로 검색 완료!</p>
            <p>거리: {response.routes[0].legs[0].distance?.text}</p>
            <p>소요 시간: {response.routes[0].legs[0].duration?.text}</p>
            <button onClick={recalculateRoute}>경로 재검색</button>
          </div>
        )}
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
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
  );
};

export default MapDirectionsPage;

// URL 라우트 상수 정의
export const ROUTES = {
  HOME: "/",
  OVERVIEW: "/overview",
  INTEGRATION: "/integration",
  MAP_BASIC: "/map-basic",
  MAP_MARKER: "/map-marker",
  MAP_MARKER_CUSTOM: "/map-marker-custom",
  MAP_LOCATION: "/map-location",
  MAP_CONTROL: "/map-control",
  MAP_DIRECTIONS: "/map-directions",
};

// 페이지 정보 상수
export const PAGE_INFO = {
  [ROUTES.HOME]: {
    title: "홈",
    description: "메인 페이지",
  },
  [ROUTES.OVERVIEW]: {
    title: "개요",
    description: "프로젝트 개요",
  },
  [ROUTES.INTEGRATION]: {
    title: "연동 방법",
    description: "Google Maps API 연동 방법",
  },
  [ROUTES.MAP_BASIC]: {
    title: "Map 기본 테스트",
    description: "기본적인 Google Map 표시 테스트",
  },
  [ROUTES.MAP_MARKER]: {
    title: "Map Marker 테스트",
    description: "기본 마커를 이용한 Map 테스트",
  },
  [ROUTES.MAP_MARKER_CUSTOM]: {
    title: "Map 커스텀 마커 테스트",
    description: "커스텀 마커와 정보창을 이용한 고급 Map 테스트",
  },
  [ROUTES.MAP_LOCATION]: {
    title: "Map 현재 위치 표시 테스트",
    description: "사용자의 현재 위치를 표시하는 Map 테스트",
  },
  [ROUTES.MAP_CONTROL]: {
    title: "Map 컨트롤 테스트",
    description: "컨트롤을 이용한 Map 테스트",
  },
  [ROUTES.MAP_DIRECTIONS]: {
    title: "Map 경로 표출 테스트",
    description: "Directions API를 이용한 경로 표시 및 길찾기 테스트",
  },
};

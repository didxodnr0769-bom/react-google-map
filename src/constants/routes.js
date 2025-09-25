// URL 라우트 상수 정의
export const ROUTES = {
  // 개요
  HOME: "/",
  INTEGRATION: "/integration",
  MAP_BASIC: "/map-basic",
  MARKER_BASIC: "/marker/basic",
  MARKER_CUSTOM: "/marker/custom",
  MAP_CONTROL: "/map-control",
  MAP_DIRECTIONS: "/map-directions",
  MAP_CURRENT_LOCATION: "/map-current-location",
  OVERLAY_BASIC: "/overlay/basic",
  OVERLAY_POLYLINE: "/overlay/polyline",
  OVERLAY_POLYGON: "/overlay/polygon",
  REAL_PATH_TRACKING: "/real/path-tracking",
  REAL_COORDINATE_SELECTION: "/real/coordinate-selection",
};

// 메뉴 그룹 구조 정의
export const MENU_GROUPS = [
  // 개요
  {
    id: "overview",
    title: "개요",
    items: [
      { path: ROUTES.HOME, title: "개요" },
      { path: ROUTES.INTEGRATION, title: "연동 방법" },
    ],
  },
  // 맵
  {
    id: "map",
    title: "맵",
    items: [
      { path: ROUTES.MAP_BASIC, title: "맵 기본 테스트" },
      { path: ROUTES.MAP_CONTROL, title: "맵 컨트롤" },
      { path: ROUTES.MAP_CURRENT_LOCATION, title: "현재 위치 테스트" },
    ],
  },
  // 마커
  {
    id: "marker",
    title: "마커",
    items: [
      { path: ROUTES.MARKER_BASIC, title: "마커 기본 테스트" },
      { path: ROUTES.MARKER_CUSTOM, title: "마커 커스텀 테스트" },
    ],
  },
  // 오버레이
  {
    id: "overlay",
    title: "오버레이",
    items: [
      { path: ROUTES.OVERLAY_BASIC, title: "오버레이 기본 테스트" },
      { path: ROUTES.OVERLAY_POLYLINE, title: "폴리라인 테스트" },
      { path: ROUTES.OVERLAY_POLYGON, title: "폴리곤 테스트" },
    ],
  },
  // 실전 기능
  {
    id: "real",
    title: "실전 기능",
    items: [
      { path: ROUTES.REAL_PATH_TRACKING, title: "경로 추적 테스트" },
      { path: ROUTES.REAL_COORDINATE_SELECTION, title: "영역 제한 테스트" },
    ],
  },
];

// 페이지 정보 상수
export const PAGE_INFO = {
  [ROUTES.HOME]: {
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
  [ROUTES.MARKER_BASIC]: {
    title: "Marker 기본 테스트",
    description: "기본 마커를 이용한 Map 테스트",
  },
  [ROUTES.MARKER_CUSTOM]: {
    title: "Marker 커스텀 테스트",
    description: "커스텀 마커와 정보창을 이용한 고급 Map 테스트",
  },
  [ROUTES.MAP_CONTROL]: {
    title: "Map 컨트롤 테스트",
    description: "컨트롤을 이용한 Map 테스트",
  },
  [ROUTES.MAP_DIRECTIONS]: {
    title: "Map 경로 표출 테스트",
    description: "Directions API를 이용한 경로 표시 및 길찾기 테스트",
  },
  [ROUTES.MAP_CURRENT_LOCATION]: {
    title: "현재 위치 테스트",
    description: "Geolocation API를 이용한 현재 위치 표시 테스트",
  },
  [ROUTES.OVERLAY_BASIC]: {
    title: "오버레이 기본 테스트",
    description: "오버레이 기본 테스트",
  },
  [ROUTES.OVERLAY_POLYLINE]: {
    title: "폴리라인 테스트",
    description: "Google Maps Polyline을 이용한 선 그리기 테스트",
  },
  [ROUTES.OVERLAY_POLYGON]: {
    title: "폴리곤 테스트",
    description: "Google Maps Polygon을 이용한 영역 그리기 테스트",
  },
  [ROUTES.REAL_PATH_TRACKING]: {
    title: "경로 추적 테스트",
    description: "현재 위치를 1초마다 조회하여 경로를 폴리라인으로 그리는 실시간 추적 테스트",
  },
  [ROUTES.REAL_COORDINATE_SELECTION]: {
    title: "영역 제한 테스트",
    description: "맵에서 특정 좌표를 선택하고 슬라이더로 반경을 조정하여 동적 원형 영역을 표출하는 테스트",
  },
};

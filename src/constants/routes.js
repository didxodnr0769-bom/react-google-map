// URL 라우트 상수 정의
export const ROUTES = {
  // 개요
  HOME: "/",
  INTEGRATION: "/integration",
  MAP_BASIC: "/map-basic",
  MAP_MARKER: "/map-marker",
  MAP_MARKER_CUSTOM: "/map-marker-custom",
  MAP_LOCATION: "/map-location",
  MAP_CONTROL: "/map-control",
  MAP_DIRECTIONS: "/map-directions",
};

// 메뉴 그룹 구조 정의
export const MENU_GROUPS = [
  {
    id: "overview",
    title: "개요",
    items: [
      { path: ROUTES.HOME, title: "개요" },
      { path: ROUTES.INTEGRATION, title: "연동 방법" },
    ],
  },
  {
    id: "map",
    title: "맵",
    items: [
      { path: ROUTES.MAP_BASIC, title: "맵 기본 테스트" },
      { path: ROUTES.MAP_LOCATION, title: "현재 위치 표시" },
      { path: ROUTES.MAP_CONTROL, title: "맵 컨트롤" },
      { path: ROUTES.MAP_DIRECTIONS, title: "경로 표출" },
    ],
  },
  {
    id: "marker",
    title: "마커",
    items: [
      { path: ROUTES.MAP_MARKER, title: "마커 기본 테스트" },
      { path: ROUTES.MAP_MARKER_CUSTOM, title: "마커 커스텀 테스트" },
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

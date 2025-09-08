// URL 라우트 상수 정의
export const ROUTES = {
  HOME: "/",
  MAP_BASIC: "/map-basic",
  MAP_MARKER: "/map-marker",
  MAP_LOCATION: "/map-location",
};

// 페이지 정보 상수
export const PAGE_INFO = {
  [ROUTES.MAP_BASIC]: {
    title: "Map 기본 테스트",
    description: "기본적인 Google Map 표시 테스트",
  },
  [ROUTES.MAP_MARKER]: {
    title: "Map Marker 커스텀 테스트",
    description: "커스텀 마커를 이용한 Map 테스트",
  },
  [ROUTES.MAP_LOCATION]: {
    title: "Map 현재 위치 표시 테스트",
    description: "사용자의 현재 위치를 표시하는 Map 테스트",
  },
};

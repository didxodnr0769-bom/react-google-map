import "./OverviewPage.css";

const OverviewPage = () => {
  return (
    <div className="overview-page">
      <div className="container">
        <h1>프로젝트 개요</h1>

        <section className="section">
          <h2>Google Maps React 프로젝트</h2>
          <p>
            이 프로젝트는 React와 Google Maps API를 활용하여 다양한 지도 기능을
            구현하고 테스트하는 데모 애플리케이션입니다.
          </p>
        </section>

        <section className="section">
          <h2>주요 기능</h2>
          <ul className="feature-list">
            <li>기본 Google Map 표시</li>
            <li>마커 표시 및 커스터마이징</li>
            <li>현재 위치 표시</li>
            <li>지도 컨트롤 기능</li>
            <li>경로 표시 및 길찾기</li>
          </ul>
        </section>

        <section className="section">
          <h2>기술 스택</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <strong>Frontend:</strong> React 19, Vite
            </div>
            <div className="tech-item">
              <strong>Maps API:</strong> Google Maps JavaScript API
            </div>
            <div className="tech-item">
              <strong>React Library:</strong> @react-google-maps/api
            </div>
            <div className="tech-item">
              <strong>Routing:</strong> React Router DOM
            </div>
          </div>
        </section>

        <section className="section">
          <h2>프로젝트 구조</h2>
          <div className="project-structure">
            <pre>
              {`src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.jsx      # 헤더 컴포넌트
│   └── SideBar.jsx     # 사이드바 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── MainPage.jsx    # 메인 페이지
│   └── map/           # 지도 관련 페이지들
├── constants/          # 상수 정의
│   └── routes.js      # 라우트 상수
└── styles/            # 전역 스타일
    └── reset.css      # CSS 리셋`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OverviewPage;

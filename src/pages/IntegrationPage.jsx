import "./IntegrationPage.css";

const IntegrationPage = () => {
  return (
    <div className="integration-page">
      <div className="container">
        <h1>Google Maps API 연동 방법</h1>

        <section className="section">
          <h2>1. Google Cloud Console 설정</h2>
          <div className="step">
            <h3>1.1 프로젝트 생성</h3>
            <ol>
              <li>Google Cloud Console에 접속</li>
              <li>새 프로젝트 생성 또는 기존 프로젝트 선택</li>
              <li>프로젝트 이름 설정</li>
            </ol>
          </div>

          <div className="step">
            <h3>1.2 API 활성화</h3>
            <ol>
              <li>API 및 서비스 &gt; 라이브러리로 이동</li>
              <li>
                다음 API들을 활성화:
                <ul>
                  <li>Maps JavaScript API</li>
                  <li>Places API</li>
                  <li>Directions API</li>
                  <li>Geocoding API</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="step">
            <h3>1.3 API 키 생성</h3>
            <ol>
              <li>API 및 서비스 &gt; 사용자 인증 정보로 이동</li>
              <li>"사용자 인증 정보 만들기" &gt; "API 키" 선택</li>
              <li>생성된 API 키 복사</li>
              <li>API 키 제한 설정 (권장)</li>
            </ol>
          </div>
        </section>

        <section className="section">
          <h2>2. React 프로젝트 설정</h2>

          <div className="step">
            <h3>2.1 패키지 설치</h3>
            <div className="code-block">
              <pre>{`npm install @react-google-maps/api`}</pre>
            </div>
          </div>

          <div className="step">
            <h3>2.2 환경 변수 설정</h3>
            <p>
              프로젝트 루트에 <code>.env</code> 파일 생성:
            </p>
            <div className="code-block">
              <pre>{`VITE_GOOGLE_MAP_KEY=your_api_key_here`}</pre>
            </div>
          </div>

          <div className="step">
            <h3>2.3 기본 설정</h3>
            <div className="code-block">
              <pre>
                {`import { LoadScript } from '@react-google-maps/api';

const libraries = ["places", "drawing", "geometry"];

function App() {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
      libraries={libraries}
    >
      {/* Your app components */}
    </LoadScript>
  );
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>3. 기본 지도 구현</h2>

          <div className="step">
            <h3>3.1 GoogleMap 컴포넌트 사용</h3>
            <div className="code-block">
              <pre>
                {`import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    libraries: ['places']
  });

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 37.5665,
    lng: 126.9780
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
    />
  );
};`}
              </pre>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>4. 주의사항</h2>
          <div className="warning-box">
            <h3>보안</h3>
            <ul>
              <li>API 키를 클라이언트 사이드에 노출하지 않도록 주의</li>
              <li>API 키 제한 설정을 통해 도메인 제한</li>
              <li>환경 변수를 사용하여 API 키 관리</li>
            </ul>
          </div>

          <div className="info-box">
            <h3>성능 최적화</h3>
            <ul>
              <li>필요한 라이브러리만 로드</li>
              <li>지도 컴포넌트의 불필요한 리렌더링 방지</li>
              <li>적절한 줌 레벨과 중심점 설정</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IntegrationPage;

import { GoogleMap } from "@react-google-maps/api";
import "@/pages/map/MapPage.css";
import MarkdownComponent from "@/components/Markdown";
import { useState, useEffect } from "react";

const center = {
  lat: 37.5665, // 서울의 위도
  lng: 126.978, // 서울의 경도
};

const BasicTestPage = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`/docs/맵/기본_테스트.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="map-page">
      <div className="map-container">
        <GoogleMap mapContainerClassName="map-inner" center={center} zoom={10}>
          {/* 기본 지도 표시 */}
        </GoogleMap>
      </div>

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default BasicTestPage;

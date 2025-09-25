import { useEffect, useState } from "react";
// import "./OverviewPage.css";
import MarkdownComponent from "@/components/Markdown";

const OverviewPage = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    // public 폴더의 마크다운 파일을 fetch로 가져옵니다.
    fetch(`/docs/개요/01_개요.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="map-page">
      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default OverviewPage;

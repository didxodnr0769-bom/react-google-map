import { useState, useEffect } from "react";
import MarkdownComponent from "@/components/Markdown";

const IntegrationPage = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`/docs/개요/02_연동_방법.md`)
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

export default IntegrationPage;

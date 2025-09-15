import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownComponent({ content }) {
  return (
    // 여기에 prose 클래스를 추가하면 자식 요소인 마크다운 콘텐츠에 스타일이 자동으로 적용됩니다.
    <article className="prose" style={{ maxWidth: "unset" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}

export default MarkdownComponent;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // 여기에 기본 스타일을 덮어쓸 CSS를 작성
            h1: {
              fontWeight: "700",
              color: "#333",
            },
            a: {
              color: "#1d4ed8", // 링크 색상을 파란색으로
              "&:hover": {
                // 마우스 올렸을 때
                color: "#1e3a8a",
              },
              textDecoration: "none", // 밑줄 제거
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

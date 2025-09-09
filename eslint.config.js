import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

// defineConfig: 설정 객체의 타입 추론을 돕는 유틸리티 함수입니다.
export default defineConfig([
  // globalIgnores: 전역적으로 검사에서 제외할 파일 및 폴더를 지정합니다.
  // 이 설정은 다른 모든 설정보다 먼저 처리됩니다.
  globalIgnores(["dist"]),

  // 설정 객체: 이 객체에 포함된 모든 규칙과 설정이 적용될 대상과 방법을 정의합니다.
  {
    // files: 이 설정 객체가 적용될 파일 패턴을 지정합니다.
    files: ["**/*.{js,jsx}"],
    // ignores: 이 설정 객체의 규칙에서만 무시할 파일 및 폴더를 지정합니다.
    // 이는 전역적으로 무시하는 globalIgnores와는 다릅니다.
    ignores: ["dist/", "node_modules/"],

    // extends: 미리 정의된 규칙 세트를 가져와 적용합니다.
    // 플러그인 객체 자체를 import하여 사용하기 때문에 별도의 plugins 속성이 필요 없습니다.
    extends: [
      // js.configs.recommended: ESLint가 권장하는 기본 규칙 세트입니다.
      js.configs.recommended,
      // reactHooks.configs["recommended-latest"]: React Hooks 플러그인의 최신 권장 규칙 세트입니다.
      reactHooks.configs["recommended-latest"],
      // reactRefresh.configs.vite: Vite 환경에서 HMR(Hot Module Replacement)을 위한 규칙 세트입니다.
      reactRefresh.configs.vite,
      // react.configs.recommended: React 플러그인이 권장하는 규칙 세트입니다.
      react.configs.recommended,
    ],

    // languageOptions: 코드의 언어 환경을 설정합니다.
    languageOptions: {
      // ecmaVersion: 코드에 사용된 ECMAScript 버전을 명시합니다.
      // "latest"로 설정하면 가장 최신 버전의 문법을 지원합니다.
      ecmaVersion: "latest",
      // globals: 코드에서 사용되는 전역 변수(예: window, document)를 정의합니다.
      // browser: 웹 브라우저 환경의 전역 변수를 활성화합니다.
      globals: globals.browser,
      // parserOptions: 파서의 옵션을 설정합니다.
      parserOptions: {
        // ecmaVersion: "latest"로 설정하여 최신 문법을 지원합니다.
        ecmaVersion: "latest",
        // ecmaFeatures: ECMAScript의 추가 기능을 활성화합니다.
        // jsx: JSX 문법 사용을 허용합니다.
        ecmaFeatures: { jsx: true },
        // sourceType: 모듈의 타입을 정의합니다. "module"은 ES 모듈 구문을 사용함을 의미합니다.
        sourceType: "module",
      },
    },

    // rules: extends로 가져온 규칙 외에, 개별 규칙을 직접 추가하거나 재정의합니다.
    rules: {
      // "no-unused-vars": 사용되지 않는 변수에 대한 규칙입니다.
      // "error": 에러로 처리하며, 빌드가 실패합니다.
      // { varsIgnorePattern: "^[A-Z_]" }: 특정 패턴의 변수는 무시합니다.
      // 여기서는 대문자로 시작하거나 "_"를 포함하는 변수를 무시합니다.
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
]);

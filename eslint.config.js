import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/", "node_modules/"] },
  js.configs.recommended,
  { files: ["extension/**/*.js"], languageOptions: { globals: { ...globals.browser, chrome: "readonly" } } },
  { files: ["scripts/**/*.mjs", "test/**/*.js", "eslint.config.js"], languageOptions: { globals: globals.node } },
];

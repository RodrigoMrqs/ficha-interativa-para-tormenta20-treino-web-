import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals, // regras de boas práticas do Next.js
  ...nextTs,     // regras específicas para TypeScript
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  prettier, // desativa regras do ESLint que conflitam com o Prettier
]);

export default eslintConfig;

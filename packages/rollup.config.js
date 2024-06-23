import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelHelpers: "bundled",
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};

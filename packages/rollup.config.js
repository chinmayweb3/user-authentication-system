import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import packagejson from "./package.json";

const plugins = [
  resolve(),
  commonjs(),
  babel({
    exclude: "node_modules/**",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    babelHelpers: "bundled",
  }),
  terser(),
];

export default [
  // {
  //   input: ["src/index.ts", "src/react/index.ts", "src/utils/index.ts"],
  //   output: {
  //     dir: "dist",
  //     format: "esm",
  //     preserveModules: true,
  //     preserveModulesRoot: "src",
  //     entryFileNames: "[name].esm.js",
  //   },

  //   plugins: [
  //     ...plugins,
  //     typescript({
  //       tsconfig: "./tsconfig.json",
  //       declaration: true,
  //       declarationDir: "dist/types",
  //       outDir: "dist",
  //       rootDir: "src",
  //     }),
  //   ],
  //   external: ["react", "react-dom"],
  // },

  // {
  //   input: "src/index.ts",
  //   output: [
  //     {
  //       dir: "dist",
  //       format: "cjs",
  //       exports: "named",
  //       preserveModules: true,
  //       preserveModulesRoot: "src",
  //       // entryFileNames: "[name].cjs.js",
  //     },
  //   ],
  //   plugins: [
  //     ...plugins,
  //     typescript({
  //       tsconfig: "./tsconfig.json",
  //       declaration: true,
  //       declarationDir: "dist/types",
  //       outDir: "dist",
  //       rootDir: "src",
  //     }),
  //   ],
  //   external: ["react", "react-dom"],
  // },
  {
    input: "src/index.ts",
    output: [
      {
        file: packagejson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packagejson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      ...plugins,
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
    external: ["react", "react-dom"],
  },
  // {
  //   input: "dist/esm/types/index.d.ts",
  //   output: [{ file: "dist/index.d.ts", format: "esm" }],
  //   plugins: [dts()],
  //   external: [/\.css$/],
  // },
];

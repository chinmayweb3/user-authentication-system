import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

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
  {
    input: "./src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].esm.js",
    },

    plugins: [
      ...plugins,
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/esm/types",
        outDir: "dist/esm",
        rootDir: "src",
      }),
    ],
    external: ["react", "react-dom"],
  },

  {
    input: ["./src/index.ts"],
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].cjs.js",
      },
    ],
    plugins: [
      ...plugins,
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/cjs/types",
        outDir: "dist/cjs",
        rootDir: "src",
      }),
    ],
    external: ["react", "react-dom"],
  },
];

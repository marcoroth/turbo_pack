import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import filesize from "rollup-plugin-filesize"
import { terser } from "rollup-plugin-terser"

import { version } from "./package.json"
const banner = `/* TurboPower ${version}\n */`

const minify = () => {
  return terser({
    mangle: true,
    compress: true,
  })
}

export default [
  {
    input: "src/index.ts",
    external: ["@hotwired/turbo"],
    output: [
      {
        name: "TurboPower",
        file: "dist/index.umd.js",
        format: "umd",
        banner,
        globals: {
          "@hotwired/turbo": "Turbo",
        },
      },
      {
        file: "dist/index.js",
        format: "es",
        banner,
      },
    ],
    plugins: [resolve(), typescript(), filesize(), minify()],
    watch: {
      include: "src/**",
    },
  },
]

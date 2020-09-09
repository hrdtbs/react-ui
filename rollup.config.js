import babel from "rollup-plugin-babel"
import pkg from "./package.json"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "rollup-plugin-typescript2"

/** @type {import('rollup').RollupOptions} */
const options = {
    input: "src/index.tsx",
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
        typescript({
            typescript: require("typescript"),
            tsconfig: "./tsconfig.build.json",
        }),
        resolve(),
        babel({
            exclude: [/\/core-js\//, "node_modules/**"],
            presets: [
                "@babel/preset-react",
                "@babel/plugin-transform-react-constant-elements",
                [
                    "@babel/preset-env",
                    {
                        useBuiltIns: "usage",
                        corejs: 3,
                    },
                ],
            ],
        }),
    ],
    output: [
        { file: `${pkg.main}`, format: "cjs" },
        { file: `${pkg.module}`, format: "es" },
    ],
}

export default [options]

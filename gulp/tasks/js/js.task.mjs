import path from 'path'
import { rollup } from 'rollup'
import babelInstance from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { Config } from '../../config.mjs'

const js = () => {
  return rollup({
    input: `./source/js/main.js`,
    plugins: [
      alias({
        entries: [
          {
            find: `~`,
            replacement: path.join(path.resolve(), `source/js`),
            customResolver: resolve({
              extensions: [`.js`],
            }),
          },
        ],
      }),
      resolve(),
      commonjs(),
      babelInstance.babel({
        babelHelpers: `bundled`,
        presets: [`@babel/preset-env`],
        babelrc: false,
        exclude: `node_modules/**`,
      }),
      !Config.isDevelopment && terser(),
    ],
  }).then((bundle) => {
    return bundle.write({
      file: `./build/js/main.min.js`,
      format: `iife`,
      sourcemap: Config.isDevelopment,
    })
  })
}

export { js }

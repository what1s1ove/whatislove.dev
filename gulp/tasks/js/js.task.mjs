import path from 'path'
import { rollup } from 'rollup'
import babelInstance from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const js = () => {
  return rollup({
    input: `${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_JS)}/main.js`,
    plugins: [
      alias({
        entries: [
          {
            find: `~`,
            replacement: path.resolve(joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_JS)),
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
      file: `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.SOURCE_JS)}/main.min.js`,
      format: `iife`,
      sourcemap: Config.isDevelopment,
    })
  })
}

export { js }

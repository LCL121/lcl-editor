import path from 'path'
import fs from 'fs'

import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// import { eslint } from 'rollup-plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import copy from 'rollup-plugin-copy'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import postcssModules from 'postcss-modules'

import packageDatas from './package.json'

const outputs = [
  {
    file: path.resolve(__dirname, './dist/js/cjs/LCLEditor.js'),
    format: 'cjs',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  },
  {
    file: path.resolve(__dirname, './dist/js/iife/LCLEditor.js'),
    format: 'iife',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  },
  {
    file: path.resolve(__dirname, './dist/js/esm/LCLEditor.js'),
    format: 'esm',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  },
  {
    file: path.resolve(__dirname, './dist/js/amd/LCLEditor.js'),
    format: 'amd',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  },
  {
    file: path.resolve(__dirname, './dist/js/umd/LCLEditor.js'),
    format: 'umd',
    name: 'LCLEditor',
    sourcemap: true
  }
]

const outputsMin = [
  {
    file: path.resolve(__dirname, './dist/js/cjs/LCLEditor.min.js'),
    format: 'cjs',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  },
  {
    file: path.resolve(__dirname, './dist/js/esm/LCLEditor.min.js'),
    format: 'esm',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  },
  {
    file: path.resolve(__dirname, './dist/js/iife/LCLEditor.min.js'),
    format: 'iife',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  },
  {
    file: path.resolve(__dirname, './dist/js/amd/LCLEditor.min.js'),
    format: 'amd',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  },
  {
    file: path.resolve(__dirname, './dist/js/umd/LCLEditor.min.js'),
    format: 'umd',
    name: 'LCLEditor',
    sourcemap: true,
    banner: `/* lcl-editor version ${packageDatas.version} */`
  }
]

const commonPlugins = [
  copy({
    targets: [
      { src: './public/*', dest: './dist' }
    ]
  }),
  json(),
  typescript(),
  resolve(),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime'
  }),
  postcss({
    // modules: true,
    plugins: [
      autoprefixer,
      postcssPresetEnv(),
      postcssModules({
        getJSON: function (cssFileName, json, outputFileName) {
          const cssName = path.basename(cssFileName, '.css')
          const jsonFileName = path.resolve('./src/styleJson/' + cssName + '.json')
          fs.writeFileSync(jsonFileName, JSON.stringify(json))
        },
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      })
    ]
  })
]

const productionPlugins = [
  clear({
    targets: [path.resolve(__dirname, './dist')]
  }),
  terser()
]

const developmentPlugins = [
  serve({
    open: true,
    port: 8888,
    contentBase: 'dist'
  }),
  livereload('dist')
]

const addPlugins = (process.env.NODE_ENV === 'production' ? productionPlugins : developmentPlugins)

export default {
  input: path.resolve(__dirname, './src/index.ts'),
  output: (process.env.NODE_ENV === 'production' ? outputsMin : outputs),
  plugins: commonPlugins.concat(...addPlugins)
}

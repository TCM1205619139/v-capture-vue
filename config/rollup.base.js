import jsonPlugin from 'rollup-plugin-json'
// import vuePlugin from 'rollup-plugin-vue'
import vuePlugin from '@vitejs/plugin-vue'
import babelPlugin from '@rollup/plugin-babel'
import replacePlugin from 'rollup-plugin-replace'
import postcssPlugin from 'rollup-plugin-postcss'
import resolvePlugin from 'rollup-plugin-node-resolve'
import commonjsPlugin from 'rollup-plugin-commonjs'
import typescriptPlugin from "rollup-plugin-ts"
import copyPlugin from 'rollup-plugin-copy'
import htmlPlugin from '@rollup/plugin-html'
import createTemplate from "../template.ts";
// import htmlTemplatePlugin from 'rollup-plugin-generate-html-template'

const path = require('path')
const join = (dirs) => {
  console.log(path.join(__dirname, '..', ...dirs))
  return path.join(__dirname, '..', ...dirs)
}

const inputFileList = ['background', 'content', 'devtool', 'option', 'popup', 'tab']
const createHtmlTemplateList = ['devtool', 'option', 'popup', 'tab']
const INPUT_PATH = 'src'
const OUTPUT_PATH = 'dist'
const multiModule = inputFileList.map(inputFile => {
  const module = {
    input: join([INPUT_PATH, inputFile, 'index.ts']),
    output: [{
      // dir: OUTPUT_PATH,
      file: join([OUTPUT_PATH, 'js', inputFile + '.js']),
      format: 'es',
      name: inputFile
    }],
    plugins: [
      resolvePlugin({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        },
        extensions: ['.vue', '.ts', '.js', '.d.ts'],
        alias: {
          '@': join(['src'])
        }
      }),
      typescriptPlugin(),
      vuePlugin(),
      jsonPlugin(),
      babelPlugin({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      postcssPlugin({
        extensions: ['.css', 'less'],
        extract: 'index.css'
      }),
      commonjsPlugin(),
      copyPlugin({
        targets: [
          {src: 'manifest.json', dest: OUTPUT_PATH},
          {src: 'static', dest: OUTPUT_PATH}
        ]
      }),
      replacePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.VUE_ENV': JSON.stringify('browser')
      }),
    ]
  }

  if (createHtmlTemplateList.includes(inputFile)) {
    console.log('需要打包成html', inputFile)
    module.plugins.push(
      htmlPlugin(
        {
          fileName: `${inputFile}.html`,
          publicPath: '../js/',
          template:({ attributes, bundle, files, publicPath, title })=>createTemplate({ attributes, bundle, files, publicPath, title }, inputFile)
        }
      )
    )
  }

  return module
})

// console.log(multiModule)


export default multiModule
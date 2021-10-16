const webpackBaseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  watch: true,
  devtool: 'eval-cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
})

const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const webpack = require('webpack')

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  devtool: 'none',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.optimize.SplitChunksPlugin()
  ]
})

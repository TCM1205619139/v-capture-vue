const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const webpack = require('webpack')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.SplitChunksPlugin()
  ]
})

const path = require('path')
const { DefinePlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const join = dir => path.join(__dirname, '..', dir)

const createHtmlTemplate = (title, filename) => {
  return new HtmlWebpackPlugin({
    title: title,
    hash: true,
    cache: true,
    inject: 'body',
    filename: `./html/${filename}.html`,
    template: join('template.html'),
    appMountId: 'app',
    chunks: [`${filename}`]
  })
}

module.exports = {
  entry: {
    background: join('src/background'),
    content: join('src/content'),
    option: join('src/option'),
    devtool: join('src/devtool'),
    popup: join('src/popup'),
    tab: join('src/tab')
  },
  output: {
    path: join('build'),
    publicPath: '../',
    filename: 'js/[name].js',
    library: '[name]',
    chunkFilename: 'js/[id].[name].js'
  },
  mode: "development",
  resolve: {
    extensions: ['.vue', '.ts', '.js'],
    alias: {
      '@': join('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
        // use: [
        //   'babel-loader',
        //   'ts-loader'
        // ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'icon/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createHtmlTemplate('background', 'background'),
    createHtmlTemplate('content', 'content'),
    createHtmlTemplate('devtool', 'devtool'),
    createHtmlTemplate('option', 'option'),
    createHtmlTemplate('popup', 'popup'),
    createHtmlTemplate('tab', 'tab'),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: join('manifest.json'), to: join('build') },
        { from: join('static'), to: join('build') }
      ]
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
}

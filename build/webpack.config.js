// 生成 umd 格式的 js 文件（index.js）
const config = require('./config')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production',
  entry: {
    app: [ './src/index.js' ]
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'BOS-UI',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [ '.js', '.vue', '.json' ],
    alias: config.alias
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  externals: config.externals,
  plugins: [
    new VueLoaderPlugin()
  ]
}

// 以 components.json 为入口，将每一个组件打包生成一个文件，用于按需加载
const config = require('./config')
const path = require('path')

// 为 json 中添加缺少的相对路径前缀
const components = require('./components.json')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const basePath = path.resolve(__dirname, '../')
const entries = {}
Object.keys(components).forEach((key) => {
  entries[key] = path.join(basePath, '', components[key])
})

module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(process.cwd(), './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: [ '.js', '.vue', '.json' ],
    alias: config.alias,
    modules: [ 'node_modules' ]
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

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

exports.externals = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  }
}

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'vue': 'vue/dist/vue.esm.js',
  '@': resolve('src')
}

exports.jsexclude = /node_modules\/(?!(monaco-editor))|\.min\.js$/

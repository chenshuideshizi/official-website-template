const path = require('path');
const plugins = require('./plugins');
const rules = require('./rules');

console.log('开始进入 webpack!');

module.exports = {
  entry: {
    common: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: "[name].[hash:8].js"
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src'),
      '@config': path.join(__dirname, '../config'),
      '@pages': path.join(__dirname, '../src/pages')
    }
  },
  module: {
    rules
  },
  plugins
}

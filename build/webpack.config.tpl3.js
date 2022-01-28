const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nav = require(`../config/data.js`).nav;

const  plugins = []
nav.forEach(value => {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `${value.path}.html`,
      template: path.resolve(__dirname, '../src/template/tpl3', `./${value.path}/index.ejs`),
      inject: true,
      chunks: ['common', value.path],
      title: `${value.text}-官网`,
      path:value.path,
      minify: {
        collapseWhitespace: true
      }
    })
  )
})

module.exports = merge(baseConfig, {
  entry: {
    common: './entry/entry-tpl3.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/tpl3'),
    filename: "[name].[hash:8].js",
    clean: true
  },
  plugins
})
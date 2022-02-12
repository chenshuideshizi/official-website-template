const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = p => path.resolve(__dirname, '../src/template-02', p)

const nav = require(`../config/data.js`).nav;

const  plugins = []
nav.forEach(value => {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `${value.path}.html`,
      template: resolve(`./pages/${value.path}/index.ejs`),
      inject: true,
      chunks: ['themeChange', 'default', value.path],
      title: `${value.text}-官网`,
      path:value.path,
      minify: {
        collapseWhitespace: true
      }
    })
  )
})

module.exports = merge(baseConfig, {
  devServer: {
    port: 9092,
    open: false,
    historyApiFallback: true,
  },
  entry: {
    themeChange: resolve('./theme-change.js'),
    default: resolve('./entry/default.js'),
    blue: resolve('./entry/blue.js'),
    red: resolve('./entry/red.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/template02'),
    filename: "[name].js",
    clean: true
  },
  plugins
})
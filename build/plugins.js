const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const TransfromAssets = require('./transfromAssets');
const path = require('path');
const nav = require(`../config/data.js`).nav;
const plugins = [];

nav.forEach(value => {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `${value.path}.html`,
      template: path.resolve(__dirname, '../src/pages', `./${value.path}/index.ejs`),
      inject: true,
      chunks: ['common', value.path],
      title: value.text === '首页' ? '官网' : `${value.text}-官网`,
      path:value.path,
      minify: {
        collapseWhitespace: true
      }
    })
  )
})

const otherPlugins = [
  new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public')
      }
  ]),
  new MiniCssExtractPlugin({
    filename: '[name].[hash:8].css',
    chunkFilename: '[id].css',
  }),
  // 不需要压缩css
  // new optimizeCss({
  //   assetNameRegExp: /\.css$/g,
  //   cssProcessor: require('cssnano'),
  //   cssProcessorOptions: {
  //     discardComments: {
  //       removeAll: true
  //     }
  //   },
  //   canPrint: true
  // }),
  new TransfromAssets()
];

plugins.splice(nav.length, 0, ...otherPlugins);

module.exports = plugins;


const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

// const TransfromAssets = require('./transfromAssets');

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      { 
        from: "public", 
        toType: 'dir',
        globOptions: {
          ignore: [
            '.DS_Store',
            '**/index.html'
          ]
        }
      }
    ]
  }),
  new MiniCssExtractPlugin({
    filename: 'themes.[name].css'
  })
];

module.exports = plugins;

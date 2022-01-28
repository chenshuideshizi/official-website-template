
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
  // new TransfromAssets()
];

module.exports = plugins;

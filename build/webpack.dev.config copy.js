const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const resolve = function resolve (p) {
  return path.resolve(__dirname, `../${p}`)
}
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== "production"
let context = resolve('src')

module.exports = {
  mode: 'development',
  devServer: {
      port: 9091,
      open: false,
      compress: true,
      static: {
        publicPath: resolve('dist'),
        directory: resolve('dist')
      },
      hot: true,
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          secure: false
        }
      }
  },
  context: resolve(''), // 基础目录，绝对路径，用于从配置中解析入口点(entry point)和 加载器(loader)。
  entry: {
    themes: './src/themes.js'
  },
  output: {
    filename: devMode ? 'static/js/[name].js' : 'static/js/[name].[contenthash:8].js',
    path: resolve('dist'),
    publicPath: '/',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.vue'],  
    alias: {
      '@': resolve('src')
    },
    modules: [
      resolve( './node_modules'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      { // 加载图片
        test: /\.(png|svg|jpg|jpeg|gif)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
					filename: 'static/images/[name].[hash][ext][query]'
				}
      }, 
      { // 加载 css
        test: /\.css$/,
        oneOf: [
          {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      { // 加载 css
        test: /\.less$/,
        oneOf: [
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'less-loader'
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'themes.[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'webpack 多主题打包演示',
      template: 'src/index.html',
      inject: true,
      excludeChunks: ['themes']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: resolve('dist'),
          toType: 'dir',
          globOptions: {
            ignore: [
              '.DS_Store',
              '**/index.html'
            ]
          }
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
            green: {
                name: 'green',
                test: /green.less$/,
                chunks: 'all',
                enforce: true,
            },
            purple: {
                name: 'purple',
                test: /purple.less$/,
                chunks: 'all',
                enforce: true,
            },
            red: {
                name: 'red',
                test: /red.less$/,
                chunks: 'all',
                enforce: true,
            },
            yellow: {
                name: 'yellow',
                test: /yellow.less$/,
                chunks: 'all',
                enforce: true,
            },
        },
    },
  },
}

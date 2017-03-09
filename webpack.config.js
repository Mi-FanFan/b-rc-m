var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
module.exports = {
  context: path.join(__dirname, 'example'),
  entry: {
    js: ['./app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: "pre",
        loader: "eslint",
        exclude: /node_modules/
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        options: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.less$/,
        use: [
          'style',
          'css',
          'postcss',
          'less',
        ]
      },
      {
        test: /\.css/,
        use: [
          'style',
          'css',
          'postcss',
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(svg)$/,
        loader: 'svg-sprite'
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: [
          autoprefixer,
          pxtorem({
            rootValue: 100,
            propWhiteList: [],
          })
        ],
      }
    }),
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV !== 'production'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'example/index.html')
    }),
    new OpenBrowserPlugin({url: 'http://localhost:8082'})
  ],
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ],
    extensions: [".web.js", ".js", ".json", ".jsx", ".css"],
  }
};

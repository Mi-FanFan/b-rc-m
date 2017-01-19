var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: ['./components/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library:'b-rc-m',
    libraryTarget:'umd'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract('style',['css', 'postcss','less'])
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(svg)$/,
        loader: 'svg-sprite'
      },
    ]
  },
  postcss: [
    autoprefixer,
    //px to rem
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    })
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }),*/
    //this won't work without ExtractTextPlugin.extract(...) in 'loaders'
    new ExtractTextPlugin('b-rc-m.css'),
  ],
  externals:{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  }
};

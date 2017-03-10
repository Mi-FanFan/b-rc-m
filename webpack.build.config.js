var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require(path.join(process.cwd(), 'package.json'));
module.exports = {
  entry: {
    [pkg.name]: './components/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: pkg.name,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",//preLoaders
        loader: "eslint-loader",
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
        test: /\.less/,
        use: ExtractTextPlugin.extract(
          {
            fallback: "style-loader",
            use: ['css', 'postcss', 'less'],
          }
        )
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
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: [
          autoprefixer,
          //px 转为 rem
          pxtorem({
            rootValue: 100,
            propWhiteList: [],
          })
        ],
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    //OccurrenceOrderPlugin is now on by default
    //new webpack.optimize.OccurenceOrderPlugin(),


    /*new webpack.optimize.UglifyJsPlugin({
     compress: {warnings: false}
     }),*/
    //this won't work without ExtractTextPlugin.extract(...) in 'loaders'
    new ExtractTextPlugin('b-rc-m.css'),
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version} \n\nCopyright 2017-present, MiFanFan, Inc.\nAll rights reserved. \nReleased under the MIT license.`),
  ],
  externals: {
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

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var sources = [
  path.resolve(__dirname, 'src'),
]

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname,
    filename: '../tag_cloud/public_html/line.js',
    library: 'ReactSvgLineChart',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  module: {
    preLoaders: [
      //{ test: /\.js?$/, include: sources, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.js$/, include: sources, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' },
      { test: /\.css$/, include: sources, loader: ExtractTextPlugin.extract('style', 'css') },
    ],
  },
  exclude: [
    path.resolve(__dirname, "node_modules"),
  ],
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('../tag_cloud/public_html/line.css'),
  ]
}

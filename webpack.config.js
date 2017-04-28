var webpack = require("webpack")
var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var sources = [
  path.resolve(__dirname, "src"),
]

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: __dirname,
    filename: "./lib/index.js",
    library: "ReactSvgLineChart",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: sources,
        exclude: /node_modules/,
        loaders: [
            "babel-loader",
            "eslint-loader?emitWarning",
          ],
      },
      {
        test: /\.css$/,
        include: sources,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: "css-loader"},
          ],
        }),
      },
    ],
  },
  externals: {
    react: {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
    },
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(
      {compress: {warnings: false}}
    ),
    new ExtractTextPlugin({
      filename: "./lib/index.css",
    }),
  ]
}

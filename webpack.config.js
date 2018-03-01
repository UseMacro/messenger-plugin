var webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),

    // Separates CSS into a separate file.
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

var options = {
  entry: {
    options: path.join(__dirname, "index.ts"),
  },

  // All file outputs from webpack will be under the 'build/' directory.
  output: {
    path: path.join(__dirname),
    filename: "index.bundle.js"
  },

  module: {
    rules: [
      {
        // Bundles all imported CSS files into one file
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap: true,
              importLoaders: 3,
              modules: true,
              namedExport: true,
              camelCase: true
            }
          },
        }),
        exclude: /node_modules/
      },
      {
        // Handles loading images
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        // Handles compiling TypeScript files into JS
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        // Handles compiling React, ES7, ES6
        test: /\.jsx?$/,
        include: path.join(__dirname, "chrome-extension", "js", "init.js"),
        loader: "babel-loader"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify('production')
    }),
    new ExtractTextPlugin("styles.css")
  ]
};

module.exports = options;

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const nodeModules = _(fs.readdirSync('node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .transform(function(result, mod) {
    result[mod] = 'commonjs ' + mod;
  }, {})
  .value();

function pathToSrc() {
  return path.join(__dirname, path.join.apply(path, arguments));
}

module.exports = {
  entry: './app.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  devtool: '#cheap-module-source-map',
  externals: nodeModules,
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [
    new webpack.BannerPlugin(
      { banner: `require("source-map-support").install({environment: 'node'});`, raw: true, entryOnly: false })
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      //application aliases
      middleware: pathToSrc('middleware'),
      models: pathToSrc('models'),
      routes: pathToSrc('routes'),
      services: pathToSrc('services'),

      app: pathToSrc('app.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  }
};
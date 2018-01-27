// (c) 2018 AquaJerry, Guangzhou University.
// Miniplane is freely distributed under the terms of ISC license.

const Cleaner = require('clean-webpack-plugin')
const Json = require('generate-json-webpack-plugin')
const path = require('path')
const Uglifyer = require('uglify-js-plugin')

// A WeChat mini game requires
// - game.js (ES5 ok, ES6 maybe)
// - game.json
module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'game.js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new Cleaner(['dist']),
    new Json('game.json', {}),
    new Uglifyer()
  ]
}

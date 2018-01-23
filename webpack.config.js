const path = require('path')
const Cleaner = require('clean-webpack-plugin')
const Json = require('merge-jsons-webpack-plugin')
const Uglifyer = require('uglify-js-plugin')

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
    new Json({
      files: ['./src/app.json'],
      output: {
        fileName: 'game.json'
      }
    }),
    new Uglifyer()
  ]
}

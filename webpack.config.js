const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, './client/src')
const BUILD_DIR = path.resolve(__dirname, './static')

const config = {
  entry: {
    main: path.resolve(SRC_DIR, 'index.js')
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules:[{
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015', 'react']}
      }]
    }]
  },
}

config.module.loaders.push({
  test: /\.(scss|css)$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader'],
});

module.exports = config;

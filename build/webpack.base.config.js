const path = require('path');
const plugins = require('./plugins');
const rules = require('./rules');

module.exports = {
  mode: "development",
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src'),
      '@config': path.join(__dirname, '../config'),
      '@pages': path.join(__dirname, '../src/pages')
    }
  },
  module: {
    rules
  },
  plugins
}

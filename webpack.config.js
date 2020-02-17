const path = require('path');
module.exports = {
  entry: './src/entry.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  output: {
    filename: 'entry.js',
    path: path.resolve(__dirname, 'output')
  },
  mode: 'development'
};

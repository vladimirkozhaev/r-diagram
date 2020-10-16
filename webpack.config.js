const path = require('path');
module.exports = {
  entry: './src/view/run.ts',
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
    filename: 'run.js',
    path: path.resolve(__dirname, 'output')
  },
  mode: 'development'
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'static');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    app: SRC_DIR + '/index.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['static']),
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.html',
      inject: false
    }),
  ],
  output: {
    filename: '[name].js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  performance: {
    hints: false
  }
};

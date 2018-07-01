const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV;

module.exports = {
  // entry: ['./src/js/index.js', './src/scss/main.scss', './src/js/sw.js'],
  entry: {
    bundle: path.resolve(__dirname) + '/src/js/index.js',
    sw: path.resolve(__dirname) + '/src/js/sw.js',
    main: path.resolve(__dirname) + '/src/scss/main.scss'
  },
  output: {
    path: path.resolve(__dirname, 'dist')// ,
    // filename: '[name].js'
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(scss)$/,
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

if (ENV === 'production') {
  baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

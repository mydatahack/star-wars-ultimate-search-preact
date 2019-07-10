const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry:['@babel/polyfill','./src/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer:{
    inline:true,
    contentBase:'./public',
    historyApiFallback: true,
    port:3000
  },

  module: {
    rules: [
      {
        test:/\.js|\.jsx$/,
        exclude:/node_modules/,
        loader:'babel-loader'
      },
      {
        test:/\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  plugins:[
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({filename: 'app.css'}),
    new CopyWebpackPlugin([
      {from:'public/img',to:'img'}
    ]),
  ]
}

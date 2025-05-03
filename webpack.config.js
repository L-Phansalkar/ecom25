const isDev = process.env.NODE_ENV === 'development'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './src/index.js'
  ],
  target : 'node',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  // devtool: 'source-map',
  // devServer: {
  //   static: {
  //     directory: path.resolve(__dirname, 'dist'),
  //   },
  //   port: 3000,
  //   open: true,
  //   hot: true,
  //   compress: true,
  //   historyApiFallback: true,
  // },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.sql$/,
        use: 'pg-minify-webpack-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    //new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.md','.sql'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
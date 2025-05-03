var webpack = import('webpack');
var path = import('path');
var fs = import('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('import("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  devtool: 'sourcemap'
}

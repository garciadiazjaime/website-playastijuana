var webpack = require('webpack');

module.exports = {
  entry: [
    './lib/client/entry',
  ],
  output: {
    path: __dirname + '/public/js/',
    filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TIER': JSON.stringify('FE')
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
   loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.scss$/, loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'] }
   ]
 }
}

const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  dist: path.join(__dirname, 'dist'),
  static: path.join(__dirname, 'static'),
};

const common = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
}

if(TARGET === 'dev' || !TARGET) {
  // JS bundle
  module.exports = _.extend({}, common, {
    entry: {
      app: path.join(PATHS.app, 'client/entry')
    },

    output: {
      path: path.join(PATHS.build, 'js'),
      filename: 'bundle.js',
    },

    devServer: {
      contentBase: PATHS.build,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      port: process.env.PORT
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],

    module: {
      preLoaders: [
        {
          test: /\.jsx$|\.js$/,
          loader: 'eslint-loader',
          include: __dirname + '/src/',
          exclude: /app\.js$/
        }
      ],
     loaders: [
        {
          test: /\.jsx$|\.js$/,
          loaders: ['babel-loader'],
          include: PATHS.app
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'],
          include: PATHS.app
        }
     ]
   },

   devtool: 'source-map',
  });
}

if(TARGET === 'build-fe') {
  module.exports = _.extend({}, common, {
    entry: {
      app: path.join(PATHS.app, 'client/entry')
    },

    output: {
      path: path.join(PATHS.static, 'js'),
      filename: 'app.js',
    },

    plugins: [
      new ExtractTextPlugin("../css/screen.css", {
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new ExtractTextPlugin("../static/css/screen.css", { allChunks: true}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
      preLoaders: [
        {
          test: /\.jsx$|\.js$/,
          loader: 'eslint-loader',
          include: __dirname + '/src/',
          exclude: /app\.js$/
        }
      ],
     loaders: [
        {
          test: /\.jsx$|\.js$/,
          loaders: ['babel-loader'],
          include: PATHS.app
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'),
          include: PATHS.app
        }
     ]
   },
  });
}

if(TARGET === 'build-be') {
  module.exports = _.extend({}, common, {
    entry: {
      app: path.join(PATHS.app, 'server/server')
    },

    externals: [nodeExternals()],

    output: {
      path: PATHS.dist,
      filename: 'server.js',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new ExtractTextPlugin("../static/css/screen.css", { allChunks: true}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
      preLoaders: [
        {
          test: /\.jsx$|\.js$/,
          loader: 'eslint-loader',
          include: __dirname + '/src/',
          exclude: /app\.js$/
        }
      ],
     loaders: [
        {
          test: /\.jsx$|\.js$/,
          loaders: ['babel-loader'],
          include: PATHS.app
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'),
          include: PATHS.app
        }
     ]
   },
  });
}

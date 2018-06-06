const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const distPath = path.join(__dirname, process.env.NODE_ENV === 'production' ? 'build' : 'src')

let config = {
  devtool: 'source-map',
  entry: {
   app: ['./src/stylesheet/styles.js', './src/javascript/index.js'],
  },
  output: {
    path: distPath,
    filename: 'javascript/bundle.js'
  },
  resolve: {
    alias: {
      glsl: path.resolve(__dirname, 'src/glsl/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin
          .extract({
            fallbackLoader: 'style-loader',
            loader: [
              { loader: 'css-loader', options: { url: false, modules: false, sourceMaps: false } },
              { loader: 'sass-loader'},
            ]
          })
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|fontsvg|eot|ttf|otf|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        THREE: "three"
    }),
    new ExtractTextPlugin('stylesheet/main.css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src')
    // proxy: {'**': 'http://localhost:8000/PROJET_WEBGL/PROJET_WEBGL/src'}
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

module.exports = config;

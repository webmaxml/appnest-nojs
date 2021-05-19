const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    compress: true,
    port: 3000
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [
            path.resolve(__dirname, 'src/hbs/helpers')
          ],
          partialDirs: [
            path.resolve(__dirname, 'src/hbs/partials'),
            path.resolve(__dirname, 'src/hbs/blocks'),
            path.resolve(__dirname, 'src/hbs/containers')
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/hbs/home.hbs',
      hash: true,
      minify: false
    })
  ]
}

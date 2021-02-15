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
          partialDirs: [
            path.resolve(__dirname, 'src/hbs'),
            path.resolve(__dirname, 'src/components/blocks'),
            path.resolve(__dirname, 'src/components/sections')
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/components/pages/home/home.hbs',
      hash: true,
      minify: false
    })
  ]
}

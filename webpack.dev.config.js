const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: './src/js/index.ts',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    compress: true,
    port: 3000
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin({
      extensions: ['.ts', '.tsx', '.js']
    })],
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: ['ts-loader']
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.hbs$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
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

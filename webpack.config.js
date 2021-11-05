const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// ----------------------------------------- entry/output -----------------------------------------

const entry = './src/ts/index.ts'
const output = {
  filename: 'js/app.js',
  path: path.resolve(__dirname, 'dist')
}

// ----------------------------------------- server -----------------------------------------

const devServer = {
  contentBase: path.resolve(__dirname, 'src'),
  compress: true,
  port: 3000
}

// ----------------------------------------- resolve -----------------------------------------

const resolve = {
  modules: [path.resolve(__dirname, 'git_modules'), 'node_modules'],
  plugins: [
    new TsconfigPathsPlugin({ extensions: ['.ts', '.tsx', '.js'] })
  ],
  extensions: ['.ts', '.tsx', '.js']
}

// ----------------------------------------- rules -----------------------------------------

const devTsRule = {
  test: /\.tsx?$/,
  include: [
    path.resolve(__dirname, 'src/ts'),
    path.resolve(__dirname, 'src/types')
  ],
  use: ['ts-loader']
}

const prodTsRule = {
  test: /\.tsx?$/,
  include: [
    path.resolve(__dirname, 'src/ts'),
    path.resolve(__dirname, 'src/types')
  ],
  use: ['ts-loader']
}

const devSassRule = {
  test: /\.scss$/,
  include: path.resolve(__dirname, 'src/sass'),
  use: ['style-loader', 'css-loader', 'sass-loader']
}

const prodSassRule = {
  test: /\.scss$/,
  include: path.resolve(__dirname, 'src/sass'),
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
}

const hbsRule = {
  test: /\.hbs$/,
  include: path.resolve(__dirname, 'src/hbs'),
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

// ----------------------------------------- plugins -----------------------------------------

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'src/hbs/home.hbs',
  hash: true,
  minify: false
})

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'css/style.css'
})

const copyPlugin = new CopyPlugin({
  patterns: [
    { from: 'src/fonts', to: 'fonts' }
  ]
})

const imageminPlugin = new ImageminPlugin({
  externalImages: {
    context: 'src',
    sources: glob.sync('src/img/**/*.*'),
    destination: 'dist',
    fileName: '[path][name].[ext]'
  },
  jpegtran: {
    progressive: true
  }
})

// ----------------------------------------- config -----------------------------------------

module.exports = function({ prod }) {
  return {
    entry,
    output,
    devServer,
    resolve,
    module: {
      rules: [
        prod ? prodTsRule : devTsRule,
        prod ? prodSassRule : devSassRule,
        hbsRule
      ]
    },
    plugins: [
      htmlWebpackPlugin,
      ...(prod ? [miniCssExtractPlugin] : []),
      ...(prod ? [copyPlugin] : []),
      ...(prod ? [imageminPlugin] : [])
    ]
  }
}

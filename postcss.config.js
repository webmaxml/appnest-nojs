module.exports = {
  plugins: [
    require('postcss-combine-duplicated-selectors'),
    require('postcss-combine-media-query'),
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' })
  ]
}

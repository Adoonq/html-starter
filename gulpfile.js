const { src, dest, series, parallel, watch } = require('gulp')

const del = require('del')
const sass = require('sass')
const webpackStream = require('webpack-stream')
const posthtmlInclude = require('posthtml-include')
const posthtmlExpressions = require('posthtml-expressions')

const gulpPlugins = require('gulp-load-plugins')()
const browserSync = require('browser-sync').create()

const { paths, options } = require('./gulp/config')

function views () {
  return src(paths.views.src)
    .pipe(gulpPlugins.posthtml([
      posthtmlInclude({ root: paths.views.root }),
      posthtmlExpressions()
    ]))
    .pipe(gulpPlugins.prettyHtml(options.pretty))
    .pipe(dest(paths.views.dest))
}

function styles () {
  return src(paths.styles.src)
    .pipe(gulpPlugins.sassGlob())
    .pipe(gulpPlugins.sass(sass)(options.sass))
    .pipe(gulpPlugins.autoprefixer())
    .pipe(gulpPlugins.rename(options.rename.app))
    .pipe(dest(paths.styles.dest))
    .pipe(gulpPlugins.cleanCss())
    .pipe(gulpPlugins.rename(options.rename.min))
    .pipe(dest(paths.styles.dest))
}

function scripts () {
  return src(paths.scripts.src)
    .pipe(webpackStream(options.webpack))
    .pipe(gulpPlugins.babel())
    .pipe(gulpPlugins.rename(options.rename.app))
    .pipe(dest(paths.scripts.dest))
    .pipe(gulpPlugins.terser())
    .pipe(gulpPlugins.rename(options.rename.min))
    .pipe(dest(paths.scripts.dest))
}

function images () {
  return src(paths.images.src)
    .pipe(gulpPlugins.newer(paths.images.dest))
    .pipe(gulpPlugins.imagemin(options.imagemin))
    .pipe(dest(paths.images.dest))
}

function deploy () {
  return src(paths.base)
    .pipe(gulpPlugins.rsync(options.rsync))
}

function clear () {
  return del(paths.del)
}

function serve () {
  browserSync.init(options.browser)

  watch(paths.views.watch, views)
  watch(paths.styles.watch, styles)
  watch(paths.scripts.watch, scripts)
  watch(paths.images.watch, images)
}

exports.views = views
exports.styles = styles
exports.scripts = scripts
exports.images = images
exports.deploy = deploy
exports.clear = clear

exports.build = series(clear, views, styles, scripts, images)
exports.default = series(parallel(views, styles, scripts, images), serve)

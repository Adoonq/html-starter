import { src, dest, series, parallel, watch } from 'gulp'

import loadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'

import { paths, options } from './gulp/config'


const bs = browserSync.create()
const plugins = loadPlugins()


const stylesTask = () => {
  return src(paths.styles.src)
    .pipe(plugins.plumber())
    .pipe(plugins.sass(options.sass))
    .pipe(plugins.autoprefixer())
    .pipe(dest(paths.styles.dest))
    .pipe(plugins.cleanCss())
    .pipe(plugins.rename(options.rename))
    .pipe(dest(paths.styles.dest))
    .pipe(bs.stream())
}

const scriptsTask = () => {
  return src(paths.scripts.src)
    .pipe(plugins.plumber())
    .pipe(plugins.babel(options.babel))
    .pipe(plugins.include(options.include))
    .pipe(dest(paths.scripts.dest))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(options.rename))
    .pipe(dest(paths.scripts.dest))
    .pipe(bs.stream())
}

const viewsTask = () => {
  return src(paths.views.src)
    .pipe(plugins.plumber())
    .pipe(plugins.ssi())
    .pipe(dest(paths.views.dest))
}

const serveTask = () => {
  bs.init(options.browserSync)

  watch(paths.styles.watch, stylesTask)
	watch(paths.scripts.watch, scriptsTask)
	watch(paths.views.watch, viewsTask).on('change', bs.reload)
}

const buildTask = parallel(stylesTask, scriptsTask, viewsTask)

exports.styles = stylesTask
exports.scripts = scriptsTask
exports.views = viewsTask
exports.build = buildTask
exports.default = series(buildTask, serveTask)
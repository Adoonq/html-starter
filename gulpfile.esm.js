import { src, dest, series, parallel, watch } from 'gulp'

import loadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'

import { paths, options } from './gulp/config'


const plugins = loadPlugins()

const browserSyncTask = () => browserSync(options.browserSync)

const stylesTask = () => {
  return src(paths.styles.src)
    .pipe(plugins.sass(options.sass).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(dest(paths.styles.dest))
    .pipe(plugins.cleanCss())
    .pipe(plugins.rename(options.rename))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

const scriptsTask = () => {
  return src(paths.scripts.src)
    .pipe(plugins.babel(options.babel))
    .pipe(plugins.include(options.include))
    .pipe(dest(paths.scripts.dest))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(options.rename))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

const watchTask = () => {
	watch(paths.styles.watch, stylesTask)
	watch(paths.scripts.watch, scriptsTask)
	watch(paths.views.watch).on('change', browserSync.reload)
}

exports.styles = stylesTask
exports.scripts = scriptsTask
exports.default = series(stylesTask, scriptsTask, parallel(browserSyncTask, watchTask))
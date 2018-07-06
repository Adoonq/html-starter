// Plugins
var gulp					= require('gulp'),
		autoprefixer	= require('gulp-autoprefixer'),
		cleancss			= require('gulp-clean-css'),
		notify				= require('gulp-notify'),
		rename				= require('gulp-rename'),
		sass					= require('gulp-sass'),
		uglify 				= require('gulp-uglify'),
		include				= require('gulp-include'),
		rsync					= require('gulp-rsync'),
		browserSync		= require('browser-sync');

// In & out paths
var path = {
	in: {
		scss: 'app/scss/main.scss',
		js: 'app/javascript/main.js',
	},
	out: {
		scss: 'app/assets/css',
		js: 'app/assets/js',
	},
	watch: {
		html: 'app/*.html',
		scss: 'app/scss/*.scss',
		js: 'app/javascript/*.js',
	},
	rsync: {
		include: ['*.htaccess'],
		exclude: ['scss', 'javascript'],
	},
	base: 'app'
}

// Plugins options
var options = {
	browserSync: {
		server: {
			baseDir: path.base
		},
		notify: false,
		// tunnel: "adoonq"
	},
	sass: {
		outputStyle: 'expanded',
		includePaths: [__dirname + '/node_modules']
	},
	sassNotify: {
		title: "[SCSS] <%= error.relativePath %>:<%= error.line %>",
		message: "<%= error.messageOriginal %>"
	},
	autoprefixer: {
		browsers: ['defaults'],
		cascade: false
	},
	rename: {
		suffix: '.min',
		prefix : ''
	},
	include: {
		extensions: 'js',
		includePaths: [__dirname + '/node_modules']
	},
	rsync: {
		root: path.base,
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html',
		include: path.rsync.include,
		exclude: path.rsync.exclude,
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}
}

// BrowserSync
gulp.task('browser-sync', function() {
	browserSync(options.browserSync)
});

// SCSS to CSS
gulp.task('scss', function() {
	return gulp.src(path.in.scss)
	.pipe(sass(options.sass).on("error", notify.onError(options.sassNotify)))
	.pipe(autoprefixer(options.autoprefixer))
	.pipe(gulp.dest(path.out.scss))
	.pipe(cleancss())
	.pipe(rename(options.rename))
	.pipe(gulp.dest(path.out.scss))
	.pipe(browserSync.stream())
});

// JavaScript
gulp.task('js', function() {
	return gulp.src(path.in.js)
	.pipe(include(options.include))
	.pipe(gulp.dest(path.out.js))
	.pipe(uglify())
	.pipe(rename(options.rename))
	.pipe(gulp.dest(path.out.js))
	.pipe(browserSync.reload({ stream: true }))
});

// RSync
gulp.task('rsync', function() {
	return gulp.src(path.base)
	.pipe(rsync(options.rsync))
});

// Watch
gulp.task('watch', ['scss', 'js', 'browser-sync'], function() {
	gulp.watch(path.watch.scss, ['scss']);
	gulp.watch(path.watch.js, ['js']);
	gulp.watch(path.watch.html, browserSync.reload)
});

gulp.task('default', ['watch']);

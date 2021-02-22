const paths = {
  base: 'app',
  styles: {
    src: 'app/scss/main.scss',
    dest: 'app/assets/css',
    watch: 'app/scss/**/*.scss'
  },
  scripts: {
    src: 'app/javascript/main.js',
    dest: 'app/assets/js',
    watch: 'app/javascript/**/*.js'
  },
  views: {
    src: 'app/views/*.html',
    dest: 'app',
    watch: 'app/views/**/*.html'
  }
}

const options = {
	browserSync: {
		server: {
			baseDir: paths.base
		}
	},
	sass: {
		outputStyle: 'expanded',
		includePaths: [`${process.cwd()}/node_modules`]
	},
  include: {
		extensions: 'js',
		includePaths: [`${process.cwd()}/node_modules`]
	},
  babel: {
    presets: ['@babel/env']
  },
	rename: {
		suffix: '.min',
		prefix : ''
	}
}

exports.paths = paths
exports.options = options 

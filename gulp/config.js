const paths = {
  base: 'app',

  views: {
    root: 'app/source/views',
    src: 'app/source/views/*.html',
    watch: 'app/source/views/**/*.html',
    dest: 'app'
  },

  styles: {
    src: 'app/source/styles/app.scss',
    watch: 'app/source/styles/**/*.scss',
    dest: 'app/assets/css'
  },

  scripts: {
    src: 'app/source/scripts/app.js',
    watch: 'app/source/scripts/**/*.js',
    dest: 'app/assets/js'
  },

  images: {
    src: 'app/source/images/**/*.{jpg,jpeg,png,svg}',
    watch: 'app/source/images/**/*.{jpg,jpeg,png,svg}',
    dest: 'app/assets/img'
  },

  del: [
    'app/*.html',
    'app/assets/**/*'
  ]
}

const options = {
  browser: {
    watch: true,
    notify: false,
    server: paths.base
  },
  pretty: {
    indent_size: 2,
    extra_liners: []
  },
  sass: {
    outputStyle: 'expanded',
    includePaths: [process.cwd() + '/node_modules']
  },
  webpack: {
    mode: 'production',
    stats: 'minimal'
  },
  rename: {
    app: { basename: 'app' },
    min: { suffix: '.min' }
  },
  imagemin: {
    silent: true
  }
}

exports.paths = paths
exports.options = options

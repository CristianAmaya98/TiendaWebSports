import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import nodemon from 'gulp-nodemon';
import autoPrefixer from 'gulp-autoprefixer';
import cssMinify from 'gulp-css-minify';
import rename from 'gulp-rename';

const paths = {
  src: {
    sass: './src/components/*.scss',
  },
  build: {
    sass: './public/styles/',
  },
  watch: {
    sass: './src/components/**/*.scss',
  },
};

const transpilarFromScssToCss = async () => {
  const sass = gulpSass(dartSass);
  return gulp
    .src(paths.src.sass)
    .pipe(
      sass({
        sourceComments: false,
        file: 'app',
      }).on('error', sass.logError)
    )
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(cssMinify())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.build.sass));
};

const watchAndReload = async () => {
  gulp.watch(paths.watch.sass, transpilarFromScssToCss);
};

const taskNodemon = async () => {
  return nodemon({
    script: './src/app.js',
    tasks: ['browserify'],
  });
};

export default gulp.series(
  transpilarFromScssToCss,
  gulp.parallel(watchAndReload, taskNodemon)
);

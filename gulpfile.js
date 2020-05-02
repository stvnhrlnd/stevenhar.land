const gulp = require('gulp');

gulp.task('css', () => {
  const postcss = require('gulp-postcss');

  return gulp
    .src('src/css/critical.css')
    .pipe(
      postcss([
        require('postcss-import'),
        require('postcss-custom-properties')({preserve: false}),
        require('autoprefixer'),
        require('cssnano')(),
      ])
    )
    .pipe(gulp.dest('src/site/_includes/css'));
});

gulp.task('build', gulp.parallel('css'));

gulp.task('watch', () => {
  gulp.watch(['src/css/*.css'], gulp.parallel('css'));
});

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', [
    'sass',
]);

gulp.task('watch', [
    'sass:watch',
]);

gulp.task('sass', () => {
    return gulp.src('./src/bdt-elm.scss')
        .pipe(sass())
        .on('error', function (err) {
            console.log(err);
        })
        .pipe(gulp.dest('docs'))
});

gulp.task('sass:watch', () => {
    gulp.watch('./src/**/*.scss', ['sass']);
});
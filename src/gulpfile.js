const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concatCSS = require('gulp-concat-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const packageJson = require('./package.json');
const dependencies = Object.keys(packageJson && packageJson.dependencies || {});
const production = !!gutil.env.production;

gulp.task('css', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass', () => {
    return gulp.src('./src/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(production ? concatCSS('app.min.css') : gutil.noop())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(production ? gutil.noop() : connect.reload());
});

gulp.task('vendor', () => {
    const b = browserify({
        entries: './src/js/bootstrap.js',
        require: dependencies,
        extensions: ['.js'],
        debug: true}).transform(babelify.configure({
            presets: ['es2015']
        }));

    b.bundle().on('error', gutil.log)
        .pipe(production ? source('vendor.min.js') : source('vendor.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(production ? uglify() : gutil.noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js', () => {
    const b = browserify({
        entries: './src/js/app.js',
        extensions: ['.js'],
        external: dependencies,
        debug: true}).transform(babelify.configure({
            presets: ['es2015']
        }));

    b.bundle().on('error', gutil.log)
        .pipe(production ? source('app.min.js') : source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(production ? uglify() : gutil.noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(production ? gutil.noop() : connect.reload());
});

gulp.task('watch', ['default'], () => {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true,
        port: 5001
    });
});

gulp.task('default', ['connect', 'css', 'sass', 'vendor', 'js'], () => {
    const files = {
        css: {
            dev: {
                reset: './dist/css/reset.css',
                app: './dist/css/app.css'
            },
            prod: {
                reset: './dist/css/reset.css',
                app: './dist/css/app.min.css'
            }
        },
        js: {
            dev: {
                vendor: './dist/js/vendor.js',
                app: './dist/js/app.js',
                screensaver: './dist/js/screensaver.js'
            },
            prod: {
                vendor: './dist/js/vendor.min.js',
                app: './dist/js/app.min.js',
                screensaver: './dist/js/screensaver.min.js'
            }
        }
    };
});

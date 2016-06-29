// Import all dependencies
const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync');
const del = require('del');
const pkg = require('./package');
const base64 = require('gulp-base64');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const data = require('./data/cv');

const reload = browserSync.reload;

// Runner banner
console.log(
    `------------------------------------
    ${pkg.name} ${pkg.version}
    ------------------------------------`
);

// If using 'watch' task, set to dev mode
let developmentMode = process.argv[2] === 'watch';

function handleErrors() {
    const args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

// Styles
gulp.task('styles', () => {
    gulp.src('./src/sass/*.scss')
        .pipe(gulpif(developmentMode, sourcemaps.init()))
        .pipe(sass()
            .on('error', sass.logError)
        )
        // .pipe(gulpif(!developmentMode, base64()))
        .pipe(gulpif(developmentMode, sourcemaps.write()))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulpif(!developmentMode, csso()))
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({
            stream: true
        }));
});

// Images
gulp.task('images', () => {
    gulp.src('./src/img/*')
        .pipe(gulpif(!developmentMode, imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./build/img'))
        .pipe(reload({
            stream: true
        }));
});

// Fonts
gulp.task('fonts', () => {
    gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./build/fonts'))
        .pipe(reload({
            stream: true
        }));
});

// SVG
gulp.task('svg', () => {
    gulp.src('./src/svg/*')
        .pipe(gulp.dest('./build/svg'))
        .pipe(reload({
            stream: true
        }));
});


// HTML
gulp.task('html', () => {

    const  options = {};

    return gulp.src('./src/templates/*.hbs')
        .pipe(handlebars(data, options))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulpif(!developmentMode, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./build'))
        .pipe(reload({
            stream: true
        }));

});


// Browser Sync
gulp.task('browser-sync', () => {
    browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server: {
            baseDir: 'build'
        },
        ghostMode: false
    });
});

// Clean output directory
gulp.task('clean', () => del(['build'], {
    dot: true
}));

// Run all tasks
gulp.task('default', ['clean'], () => {
    gulp.start(['html', 'images', 'styles', 'svg', 'fonts']);
});

// Run all tasks, then watch for future changes
gulp.task('watch', ['default', 'browser-sync'], () => {
    gulp.watch(['./src/fonts/*'], ['fonts']);
    gulp.watch(['./src/svg/**/*.svg'], ['svg']);
    gulp.watch(['./src/templates/*.hbs', './data/*.json'], ['html']);
    gulp.watch(['./src/sass/**/*.scss'], ['styles']);
});

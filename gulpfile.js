var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify');

var paths = {
    scripts: [
        'src/coffee/utils.coffee',
        'src/coffee/color.coffee',
        'src/coffee/geomap.coffee',
        'src/coffee/choropleth.coffee'
    ],
    exp: [
        'src/coffee/utils.coffee',
        'src/coffee/color.coffee',
        'src/coffee/exp.coffee'
    ],
    styles: ['src/**/*.sass'],
    data: ['src/**/*.json']
};

// Run dev server
gulp.task('connect', function() {
    connect.server({
        root: __dirname,
        port: 8080,
        livereload: true
    });
});

// Copy geo data
gulp.task('data', function() {
    gulp.src(paths.data)
        .pipe(gulp.dest('dist'));
});

// Minify scripts and styles
gulp.task('minify', ['scripts'], function() {
    gulp.src('dist/js/d3.geomap.js')
        .pipe(uglify())
        .pipe(concat('d3.geomap.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// Minify and copy scripts
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(coffee({bare: true}))
        .pipe(concat('d3.geomap.js'))
        .pipe(gulp.dest('dist/js'));
});

// Minify and copy exp
gulp.task('exp', function() {
    return gulp.src(paths.exp)
        .pipe(coffee({bare: true}))
        .pipe(concat('d3.exp.js'))
        .pipe(gulp.dest('dist/js'));
});

// Compile and copy sass
gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(concat('d3.geomap.css'))
        .pipe(gulp.dest('dist/css'));
});

// Rerun task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.exp, ['exp']);
});

// Build the JavaScript and CSS files
gulp.task('build', ['data', 'scripts', 'styles', 'minify']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build', 'connect', 'watch']);
var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify');

var paths = {
    scripts: [
        'src/coffee/utils.coffee',
        'src/coffee/colorbrewer.coffee',
        'src/coffee/geomap.coffee',
        'src/coffee/choropleth.coffee'
    ],
    styles: ['src/**/*.sass'],
    data: ['src/**/*.json'],
    vendor: [
        'node_modules/d3/d3.min.js',
        'node_modules/d3-geo-projection/d3.geo.projection.min.js',
        'node_modules/topojson/topojson.min.js'
    ],
};

// Run dev server
gulp.task('connect', function() {
    connect.server({
        root: __dirname,
        port: 8000,
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
        .pipe(coffee())
        .pipe(concat('d3.geomap.js'))
        .pipe(gulp.dest('dist/js'));
});

// Compile and copy sass
gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(concat('d3.geomap.css'))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate and copy vendor scripts
gulp.task('vendor', function() {
    return gulp.src(paths.vendor)
        .pipe(concat('d3.geomap.dependencies.min.js'))
        .pipe(gulp.dest('dist/vendor'));
});

// Rerun task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

// Build files needed for distribution
gulp.task('dist', ['data', 'scripts', 'styles', 'minify']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['dist', 'connect', 'watch']);
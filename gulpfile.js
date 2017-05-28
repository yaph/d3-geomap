var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip'),
    del = require('del'),
    pkg = require('./package.json');


var paths = {
    scripts: [
        'src/js/utils.js',
        'src/js/colorbrewer.js',
        'src/js/geomap.js',
        'src/js/choropleth.js'
    ],
    styles: 'src/**/*.sass',
    data: 'src/**/*.json',
    vendor: [
        'node_modules/d3/build/d3.min.js',
        'node_modules/d3-geo-projection/build/d3-geo-projection.min.js',
        'node_modules/topojson/dist/topojson.min.js'
    ]
};

// Bundle resources in dist so they can be downloaded.
gulp.task('bundle', function() {
    gulp.src('LICENSE')
        .pipe(gulp.dest('dist'));
    gulp.src('node_modules/d3/LICENSE')
        .pipe(gulp.dest('dist/vendor'));

    var target = 'd3-geomap-' + pkg.version + '.zip';
    gulp.src('dist/**/*', {base: 'dist'})
        .pipe(zip(target))
        .pipe(gulp.dest('bundle'));
});

gulp.task('clean', function() {
    del(['dist']);
});

// Run dev server.
gulp.task('connect', function() {
    connect.server({
        root: __dirname,
        port: 8000,
        livereload: true
    });
});

// Copy geo data.
gulp.task('data', function() {
    gulp.src(paths.data)
        .pipe(gulp.dest('dist'));
});

// Minify scripts and styles.
gulp.task('minify', ['babel'], function() {
    gulp.src('dist/js/d3.geomap.js')
//        .pipe(uglify())
        .pipe(concat('d3.geomap.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// Compile and concat scripts.
gulp.task('babel', function() {
    return gulp.src(paths.scripts)
        .pipe(babel())
        .pipe(concat('d3.geomap.js'))
        .pipe(gulp.dest('dist/js'));
});

// Compile and copy sass.
gulp.task('styles', function () {
    return sass(paths.styles)
        .pipe(concat('d3.geomap.css'))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate and copy vendor scripts.
gulp.task('vendor', function() {
    return gulp.src(paths.vendor)
        .pipe(concat('d3.geomap.dependencies.min.js'))
        .pipe(gulp.dest('dist/vendor'));
});

// Rerun task when a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['babel']);
    gulp.watch(paths.styles, ['styles']);
});

// Build files needed for distribution.
gulp.task('dist', ['data', 'babel', 'styles', 'minify', 'vendor']);

// The default task (called when you run `gulp` from cli).
gulp.task('default', ['dist', 'connect', 'watch']);

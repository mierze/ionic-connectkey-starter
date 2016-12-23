var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    gulp = require('gulp'),
    useref = require('gulp-useref'),
    ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    runSequence = require('run-sequence'),
    production = 'www',
    productionMode = false; //set to true to minify

var paths = {
    'sassRoot': './app/app.scss',
    'sass': './app/**/*.scss',
    'clean': [production, 'build'],
    'html': ['./app/**/*.html'],
    'build': ['./build/**/*.js'],
    'extras': ['./app/res/**/*'],
    'js': ['./app/*.js', './app/**/*.js', '!./app/res/**']
};

gulp.task('build', function(cb) {
    //full build
    runSequence('clean', ['build-sass', 'build-html', 'build-js'], 'build-res', 'clean-build', cb);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['build-sass']);
    gulp.watch(paths.html, ['build-html']);
    gulp.watch(paths.js, ['build-js']);
    gulp.watch(paths.extras, ['extras']);
});


gulp.task('build-js', function(cb) {
    //just build javascript
    runSequence('ng_annotate', 'uglify', cb);
});

//build-js part 1
gulp.task('ng_annotate', function(done) {
    gulp.src(paths.js)
        .pipe(ngAnnotate({
            single_quotes: true
        }))
        .pipe(gulp.dest('./build'))
        .on('end', done);
});

//build-js part 2
gulp.task('uglify', function() {
    if (productionMode == true) {
        return gulp.src(paths.build)
            .pipe(concat('bundle.js'))
            .pipe(gulp.dest(production))
            .pipe(rename('bundle.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(production));
    } else {
        return gulp.src(paths.build)
            .pipe(concat('bundle.js'))
            .pipe(gulp.dest(production));
    }
});

gulp.task('build-html', function() {
    return gulp.src(paths.html)
        .pipe(useref())
        .pipe(gulp.dest(production));
});

gulp.task('build-sass', function(done) {
    gulp.src(paths.sassRoot)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./build/theme'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./' + production))
        .on('end', done);
});

gulp.task('build-res', function() {
    //move static resources
    gulp.src(paths.extras)
        .pipe(gulp.dest('./' + production + '/res'));
});

gulp.task('clean', function() {
    return del(paths.clean);
});

gulp.task('clean-build', function() {
    return del(paths.clean[1]);
})

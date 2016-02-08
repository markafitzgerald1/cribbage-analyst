var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    jsdoc = require("gulp-jsdoc"),
    lintTaskName = 'lint',
    testTaskName = 'test',
    jsDocTaskName = 'jsDoc',
    continuousTaskName = 'continuous';

gulp.task(lintTaskName, function() {
    return gulp.src(['src/*.js', 'spec/*Spec.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task(testTaskName, [lintTaskName], function() {
    return gulp.src('spec/*Spec.js')
        .pipe(jasmine());
});

gulp.task(jsDocTaskName, [testTaskName], function() {
    return gulp.src('./src/*.js')
        .pipe(jsdoc('./jsDoc'));
});

gulp.task(continuousTaskName, [jsDocTaskName], function() {
    gulp.watch(['src/*.js', 'spec/*Spec.js'], [jsDocTaskName]);
});

// doesn't seem to help
//process.on('uncaughtException', function(e) {
//    console.error(e.stack);
//});

gulp.task('default', [jsDocTaskName]);
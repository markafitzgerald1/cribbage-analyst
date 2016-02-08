/* global require */

(function() {
    "use strict";

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

    gulp.task('default', [jsDocTaskName]);
}());
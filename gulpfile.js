/* global require */

(function() {
    "use strict";

    var gulp = require('gulp'),
        jshint = require('gulp-jshint'),
        jasmine = require('gulp-jasmine'),
        cover = require('gulp-coverage'),
        jsdoc = require("gulp-jsdoc"),
        webpackStream = require('webpack-stream'),
        lintTaskName = 'lint',
        testTaskName = 'test',
        jsDocTaskName = 'jsDoc',
        coverageTaskName = 'coverage',
        webpackTaskName = 'webpack',
        continuousTaskName = 'continuous',
        sources = 'src/*.js',
        specs = 'spec/*Spec.js';

    gulp.task(lintTaskName, function() {
        return gulp.src([sources, specs])
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task(testTaskName, [lintTaskName], function() {
        return gulp.src(specs)
            .pipe(jasmine());
    });

    gulp.task(jsDocTaskName, [testTaskName], function() {
        return gulp.src('./src/*.js')
            .pipe(jsdoc('./jsDoc'));
    });

    gulp.task(coverageTaskName, [jsDocTaskName], function() {
        return gulp.src(specs)
            .pipe(cover.instrument({
                pattern: [sources]
            }))
            .pipe(jasmine())
            .pipe(cover.gather())
            .pipe(cover.format())
            .pipe(gulp.dest('coverage'))
            .pipe(cover.enforce());
    });

    gulp.task(webpackTaskName, [coverageTaskName], function() {
        return gulp.src('src/cribbageCard.js')
            .pipe(webpackStream({
                output: {
                    filename: 'cribbageCardBundle.js',
                }
            }))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task(continuousTaskName, [webpackTaskName], function() {
        gulp.watch([sources, specs], [webpackTaskName]);
    });

    gulp.task('default', [webpackTaskName]);
}());
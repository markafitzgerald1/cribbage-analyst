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
        jsdocTaskName = 'jsdoc',
        coverageTaskName = 'coverage',
        webpackTaskName = 'webpack',
        continuousTaskNameSuffix = '-continuous',
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

    gulp.task(jsdocTaskName, [testTaskName], function() {
        return gulp.src('./src/*.js')
            .pipe(jsdoc('./jsDoc'));
    });

    // the much cheaper of the two -continuous tasks
    gulp.task(jsdocTaskName + continuousTaskNameSuffix, [jsdocTaskName], function() {
        gulp.watch(sources, [jsdocTaskName]);
    });

    gulp.task(coverageTaskName, [jsdocTaskName], function() {
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
        return gulp.src(sources)
            .pipe(webpackStream({
                entry: {
                    cribbageCard: './src/cribbageCard.js',
                    cribbageScoring: './src/cribbageScoring.js'
                },
                output: {
                    filename: '[name].bundle.js',
                    libraryTarget: 'var',
                    library: '[name]'
                }
            }))
            .pipe(gulp.dest('dist/'));
    });

    /* sometimes rather expensive (> 1 minute), but thorough and expected
     * before commit. */
    gulp.task(webpackTaskName + continuousTaskNameSuffix, [webpackTaskName], function() {
        gulp.watch([sources, specs], [webpackTaskName]);
    });

    gulp.task('default', [webpackTaskName]);
}());
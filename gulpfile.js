/* global require */

(function() {
    'use strict';

    var gulp = require('gulp'),
        del = require('del'),
        jshint = require('gulp-jshint'),
        jsdoc = require('gulp-jsdoc'),
        jasmine = require('gulp-jasmine'),
        jscs = require('gulp-jscs'),
        webpackStream = require('webpack-stream'),
        cover = require('gulp-coverage'),
        cleanTaskName = 'clean',
        lintTaskName = 'lint',
        codestyleTaskName = 'codestyle',
        testTaskName = 'test',
        jsdocTaskName = 'jsdoc',
        webpackTaskName = 'webpack',
        coverageTaskName = 'coverage',
        continuousTaskNameSuffix = '-continuous',
        sources = 'src/*.js',
        specs = 'spec/*Spec.js',
        gulpfile = 'gulpfile.js',
        jshintrc = '.jshintrc',
        jscsrc = '.jscsrc';

    gulp.task(cleanTaskName, function() {
        return del([
            // JSDoc
            'jsDoc/',
            // webpack bundles
            'dist/',
            // coverageTaskName files
            '.coverdata/', '.coverrun', 'coverage'
        ]);
    });

    gulp.task(lintTaskName, [cleanTaskName], function() {
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
        return gulp.src(sources)
            .pipe(jsdoc('./jsDoc'));
    });

    gulp.task(codestyleTaskName, [jsdocTaskName], function() {
        return gulp.src([sources, specs, gulpfile])
            .pipe(jscs())
            .pipe(jscs.reporter())
            .pipe(jscs.reporter('fail'));
    });

    gulp.task(webpackTaskName, [codestyleTaskName], function() {
        return gulp.src(sources)
            .pipe(webpackStream({
                entry: {
                    cribbageAnalyst: './src/cribbageAnalyst.js'
                },
                output: {
                    filename: '[name].bundle.js',
                    libraryTarget: 'var',
                    library: '[name]'
                }
            }))
            .pipe(gulp.dest('dist/'));
    });

    // the much cheaper of the two -continuous tasks
    gulp.task(webpackTaskName + continuousTaskNameSuffix, [webpackTaskName],
        function() {
            gulp.watch([sources, specs, jshintrc, jscsrc], [
                webpackTaskName
            ]);
        });

    /* sometimes rather expensive (> 1 minute), but thorough and expected
     * before commit. */
    gulp.task(coverageTaskName, [webpackTaskName], function() {
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

    gulp.task('default', [coverageTaskName]);
}());

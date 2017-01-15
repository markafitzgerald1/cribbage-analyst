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
        connect = require('gulp-connect'),
        nightwatch = require('gulp-nightwatch'),
        cleanTaskName = 'clean',
        lintTaskName = 'lint',
        codestyleTaskName = 'codestyle',
        testTaskName = 'test',
        jsdocTaskName = 'jsdoc',
        webpackTaskName = 'webpack',
        coverageTaskName = 'coverage',
        startServerTaskName = 'startServer',
        nightwatchTaskName = 'nightwatch',
        continuousTaskNameSuffix = '-continuous',
        sources = 'src/*.js',
        htmlSource = 'index.html',
        endpointSources = 'src/cribbageAnalyst.js',
        specs = 'spec/*Spec.js',
        nightwatchSpecs = 'nightwatchSpec/*.js',
        gulpfile = 'gulpfile.js',
        jshintrc = '.jshintrc',
        jscsrc = '.jscsrc';

    gulp.task(cleanTaskName, function() {
        return del([
            // JSDoc
            'jsDoc/',
            // webpack bundles
            'dist/',
            // nightwatch output
            'e2e_tests_output', 'e2e_test_screenshots',
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
            .pipe(jasmine({
                includeStackTrace: true
            }));
    });

    gulp.task(jsdocTaskName, [testTaskName], function() {
        return gulp.src(sources)
            .pipe(jsdoc('./jsDoc'));
    });

    gulp.task(codestyleTaskName, [jsdocTaskName], function() {
        return gulp.src([sources, specs, nightwatchSpecs, gulpfile])
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
            gulp.watch([sources, specs, nightwatchSpecs, jshintrc,
                jscsrc
            ], [
                webpackTaskName
            ]);
        });

    /* must be started in separate Gulp run in order for nightwatchTaskName to
     * pass. */
    gulp.task(startServerTaskName, function() {
        connect.server();
    });

    gulp.task(nightwatchTaskName, [webpackTaskName], function() {
        return gulp.src('')
            .pipe(nightwatch({
                configFile: 'spec/nightwatch.json'
            }));
    });

    gulp.task(nightwatchTaskName + continuousTaskNameSuffix, [
            nightwatchTaskName
        ],
        function() {
            gulp.watch([htmlSource, sources, specs, nightwatchSpecs,
                jshintrc, jscsrc
            ], [
                nightwatchTaskName
            ]);
        });

    /* sometimes rather expensive (> 1 minute), but thorough and expected
     * before commit. */
    gulp.task(coverageTaskName, [nightwatchTaskName], function() {
        return gulp.src(specs)
            .pipe(cover.instrument({
                pattern: [sources, '!' + endpointSources]
            }))
            .pipe(jasmine())
            .pipe(cover.gather())
            .pipe(cover.format())
            .pipe(gulp.dest('coverage'))
            .pipe(cover.enforce());
    });

    gulp.task('default', [coverageTaskName]);
}());

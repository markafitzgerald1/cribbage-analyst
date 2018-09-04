/* jshint strict: global, node: true */

'use strict';

var gulp = require('gulp'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    jsdoc3 = require('gulp-jsdoc3'),
    jasmine = require('gulp-jasmine'),
    jscs = require('gulp-jscs'),
    webpackStream = require('webpack-stream'),
    cover = require('gulp-coverage'),
    connect = require('gulp-connect'),
    nightwatch = require('gulp-nightwatch'),
    ghPages = require('gh-pages'),
    cleanTaskName = 'clean',
    lintTaskName = 'lint',
    jsdocTaskName = 'jsdoc',
    jscsTaskName = 'jscs',
    testTaskName = 'test',
    webpackTaskName = 'webpack',
    copyTaskName = 'copy',
    coverageTaskName = 'coverage',
    startServerTaskName = 'startServer',
    nightwatchTaskName = 'nightwatch',
    onlyDeployTaskName = 'onlyDeploy',
    deployTaskName = 'deploy',
    defaultTaskName = 'default',
    continuousTaskNameSuffix = '-continuous',
    scripts = 'scripts/*.js',
    sources = 'src/*.js',
    htmlSource = 'index.html',
    endpointSources = 'src/cribbageAnalyst.js',
    specs = 'spec/*Spec.js',
    nightwatchSpecs = 'nightwatchSpec/*.js',
    gulpfile = 'gulpfile.js',
    jshintrc = '.jshintrc',
    jscsrc = '.jscsrc',
    distFolder = 'dist/',
    staticSourceFiles = ['index.html', 'index.css'];

gulp.task(cleanTaskName, function() {
    return del([
        // JSDoc
        'docs/',
        // webpack bundles
        distFolder,
        // nightwatch output
        'e2e_tests_output',
        'e2e_test_screenshots',
        // coverageTaskName files
        '.coverdata/',
        '.coverrun',
        'coverage',
        // site publication files
        '.publish/'
    ]);
});

gulp.task(lintTaskName, [cleanTaskName], function() {
    return gulp
        .src([scripts, sources, specs])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task(testTaskName, [lintTaskName], function() {
    return gulp.src(specs).pipe(
        jasmine({
            includeStackTrace: true
        })
    );
});

gulp.task(jsdocTaskName, [testTaskName], function() {
    return gulp.src(sources).pipe(jsdoc3());
});

gulp.task(jscsTaskName, [jsdocTaskName], function() {
    return gulp
        .src([gulpfile, scripts, sources, specs, nightwatchSpecs])
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
});

gulp.task(webpackTaskName, [jscsTaskName], function() {
    return gulp
        .src(sources)
        .pipe(
            webpackStream({
                entry: {
                    cribbageAnalyst: './src/cribbageAnalyst.js'
                },
                output: {
                    filename: '[name].bundle.js',
                    libraryTarget: 'var',
                    library: '[name]'
                }
            })
        )
        .pipe(gulp.dest(distFolder));
});

// the much cheaper of the two -continuous tasks
gulp.task(
    webpackTaskName + continuousTaskNameSuffix,
    [webpackTaskName],
    function() {
        gulp.watch(
            [scripts, sources, specs, nightwatchSpecs, jshintrc, jscsrc],
            [webpackTaskName]
        );
    }
);

gulp.task(copyTaskName, [webpackTaskName], function() {
    return gulp.src(staticSourceFiles).pipe(gulp.dest(distFolder));
});

/* must be started in separate Gulp run in order for nightwatchTaskName to
 * pass. */
gulp.task(startServerTaskName, function() {
    connect.server({
        root: distFolder
    });
});

gulp.task(nightwatchTaskName, [copyTaskName], function() {
    return gulp.src('').pipe(
        nightwatch({
            configFile: 'nightwatch.json'
        })
    );
});

gulp.task(
    nightwatchTaskName + continuousTaskNameSuffix,
    [nightwatchTaskName],
    function() {
        gulp.watch(
            [htmlSource, sources, specs, nightwatchSpecs, jshintrc, jscsrc],
            [nightwatchTaskName]
        );
    }
);

/* sometimes rather expensive (> 1 minute), but thorough and expected
 * before commit. */
gulp.task(coverageTaskName, [nightwatchTaskName], function() {
    return gulp
        .src(specs)
        .pipe(
            cover.instrument({
                pattern: [sources, '!' + endpointSources]
            })
        )
        .pipe(jasmine())
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('coverage'))
        .pipe(cover.enforce());
});

gulp.task(
    coverageTaskName + continuousTaskNameSuffix,
    [coverageTaskName],
    function() {
        gulp.watch(
            [htmlSource, sources, specs, nightwatchSpecs, jshintrc, jscsrc],
            [coverageTaskName]
        );
    }
);

gulp.task(onlyDeployTaskName, [], function() {
    return ghPages.publish(distFolder);
});

gulp.task(deployTaskName, [coverageTaskName, onlyDeployTaskName]);

gulp.task(defaultTaskName, [coverageTaskName]);

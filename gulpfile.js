var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    lintTaskName = 'lint',
    testTaskName = 'test';

gulp.task(lintTaskName, function() {
    return gulp.src(['src/*.js', 'spec/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('fail'));
});

gulp.task(testTaskName, [lintTaskName], function() {
    return gulp.src('spec/cribbageCardSpec.js').pipe(jasmine());
});

gulp.task('default', [testTaskName]);
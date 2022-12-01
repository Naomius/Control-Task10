'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require("gulp-rename");

function defaultTask() {
    return gulp.src('css/*.less')
        .pipe(concat("all.less"))
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
}

exports.default = defaultTask

exports.watch = function () {
    gulp.watch('css/*.less', gulp.series('default'));
};
/* eslint-env node */
/* eslint-disable no-console */

/**
 * Copyright 2017 Chialab. All Rights Reserved.
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const env = process.env;
const project = require('./package.json');

const path = require('path');
const del = require('del');
const mkdirp = require('mkdirp');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rollup = require('rollup-stream');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const exec = require('child-process-promise').exec;
const karma = require('karma');

const DIST_PATH = 'dist';
const SRC_PATH = 'src';
const TMP_PATH = '.tmp';
const ENTRY = path.basename(project.main || project.module);

function clean() {
    let paths = [DIST_PATH, TMP_PATH];
    return del(paths).then(() => {
        paths.forEach((p) => mkdirp.sync(p));
        return Promise.resolve();
    });
}

function lint() {
    return gulp.src(SRC_PATH)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function compile() {
    env.NODE_ENV = 'production';
    return rollup('rollup.config.js')
        .on('error', (err) => {
            // eslint-disable-next-line
            console.error(err);
            process.exit(1);
        })
        .pipe(source(ENTRY))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true,
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_PATH));
}

function compileUnitTests() {
    return rollup('rollup.config.js')
        .on('error', (err) => {
            // eslint-disable-next-line
            console.error(err);
            process.exit(1);
        })
        .pipe(source('specs.js', TMP_PATH))
        .pipe(buffer())
        .pipe(gulp.dest(TMP_PATH));
}

function unitNode() {
    env.NODE_ENV = 'test';
    env.TARGET = 'node';
    return compileUnitTests().pipe(mocha());
}

function unitKarma(done) {
    env.NODE_ENV = 'test';
    env.TARGET = 'browser';
    compileUnitTests()
        .on('end', () => {
            new karma.Server({
                configFile: path.join(__dirname, 'karma.conf.js'),
                singleRun: true,
            }, done).start();
        });
}

function execAndLog(cmd) {
    let promise = exec(cmd);
    let childProcess = promise.childProcess;
    childProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    childProcess.stderr.on('data', (data) => {
        console.error(data.toString());
    });
    return promise;
}

function unitNativescipt(platform, done) {
    env.NODE_ENV = 'test';
    env.TARGET = 'node';
    compileUnitTests()
        .on('end', () => {
            execAndLog('tns create Test --path .tmp')
                .then(() => execAndLog('tns test init --path .tmp/Test --framework mocha'))
                .then(() => execAndLog('cp .tmp/specs.js .tmp/Test/app/tests'))
                .then(() => execAndLog(`tns test ${platform} --emulator --justlaunch --path .tmp/Test`))
                .then(() => done())
                .catch(() => {
                    process.exit(1);
                });
        });
}

function unitNativesciptIOS(done) {
    unitNativescipt('ios', done);
}

function unitNativesciptAndroid(done) {
    unitNativescipt('android', done);
}

gulp.task('clean', clean);
gulp.task('lint', lint);
gulp.task('js', ['clean', 'lint'], compile);
gulp.task('unit-node', ['clean', 'lint'], unitNode);
gulp.task('unit-browsers', ['clean', 'lint'], unitKarma);
gulp.task('unit-nativescript-ios', ['clean', 'lint'], unitNativesciptIOS);
gulp.task('unit-nativescript-android', ['clean', 'lint'], unitNativesciptAndroid);
gulp.task('dist', ['js']);

gulp.task('default', ['dist']);

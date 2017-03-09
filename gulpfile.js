/* eslint-env node */

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

const path = require('path');
const del = require('del');
const mkdirp = require('mkdirp');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rollup = require('rollup-stream');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const karma = require('karma');

const env = process.env;
const karmaConfig = path.resolve('./karma.conf.js');
const DIST_PATH = 'dist';
const SRC_PATH = 'src';
const ENTRY = 'schema-model.js';

function clean() {
    let p = path.join(DIST_PATH);
    return del([p]).then(() => {
        mkdirp.sync(p);
        return Promise.resolve();
    });
}

function lint() {
    return gulp.src(path.join(SRC_PATH, ENTRY))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function jsCompile() {
    return rollup('rollup.config.js')
        .on('error', (err) => {
            // eslint-disable-next-line
            console.error(err);
        })
        .pipe(source(ENTRY))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true,
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_PATH));
}

function jsMin() {
    env.NODE_ENV = 'production';
    env.min = true;

    return jsCompile();
}

function jsWatch() {
    return jsCompile(env.TMP_PATH)
        .on('end', () => {
            gulp.watch(path.join(SRC_PATH, '**/*.js'), () =>
                jsCompile(env.TMP_PATH)
            );
        });
}

function unit(done) {
    env.NODE_ENV = 'test';
    new karma.Server({
        configFile: karmaConfig,
        singleRun: true,
    }, done).start();
}

function unitServer(done) {
    env.NODE_ENV = 'test';
    new karma.Server({
        configFile: karmaConfig,
        browsers: [],
        singleRun: false,
    }, done).start();
}

function unitWatch(done) {
    env.NODE_ENV = 'test';
    new karma.Server({
        configFile: karmaConfig,
        browsers: ['Chrome', 'Firefox'],
    }, done).start();
}

gulp.task('clean', clean);
gulp.task('unit', unit);
gulp.task('unit-server', unitServer);
gulp.task('unit-watch', unitWatch);
gulp.task('lint', lint);
gulp.task('js', ['clean', 'lint'], jsMin);
gulp.task('js-watch', jsWatch);
gulp.task('dist', ['js']);

gulp.task('default', ['dist']);

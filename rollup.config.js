/* eslint-env node */
/* eslint-disable no-unused-vars */

const env = process.env;
const project = require('./package.json');

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const istanbul = require('rollup-plugin-istanbul');
const json = require('rollup-plugin-json');
const multiEntry = require('rollup-plugin-multi-entry');
const builtins = require('rollup-plugin-node-builtins');
const inject = require('rollup-plugin-inject');

const TEST_ENV = (env.NODE_ENV === 'test');
const PRODUCTION_ENV = (env.NODE_ENV === 'production');
const BROWSER_TARGET = (env.TARGET === 'browser');
const NODE_TARGET = (env.TARGET === 'node');

module.exports = {
    sourceMap: process.env.NODE_ENV !== 'production' ? 'inline' : false,
    format: 'umd',
    moduleName: camelize(project.main),
    entry: TEST_ENV ? './test/**/*.spec.js' : project.module,
    useStrict: false,
    plugins: [
        NODE_TARGET ? builtins() : {},
        multiEntry(),
        json(),
        nodeResolve(),
        TEST_ENV ? istanbul({
            include: [
                'src/**/*.js',
            ],
        }) : {},
        commonjs({
            include: ['node_modules/tv4/tv4.js'],
        }),
        babel({
            include: [
                './index.js',
                'node_modules/**/*.{js,jsx}',
                'src/**/*.{js,jsx}',
                'test/**/*.{js,jsx}',
            ],
        }),
        (TEST_ENV && NODE_TARGET) ? inject({
            include: 'test/**/*.js',
            assert: 'assert',
        }) : {},
        PRODUCTION_ENV ? uglify({
            output: {
                comments: /@license/,
            },
        }) : {},
    ],
};

function camelize(str) {
    return str.replace(/(^[a-z0-9]|[-_]([a-z0-9]))/g, (g) => (g[1] || g[0]).toUpperCase())
}

/* jshint strict: global, node: true */

'use strict';

const del = require('del'),
    childProcess = require('child_process'),
    config = Object.freeze({
        jsdocDirectory: 'jsdoc'
    });

del(config.jsdocDirectory);
console.log(
    childProcess
        .execFileSync('node', [
            'node_modules/jsdoc/jsdoc.js',
            '--readme',
            'README.md',
            '--package',
            'package.json',
            '--destination',
            config.jsdocDirectory,
            '--pedantic',
            '--verbose',
            'src/'
        ])
        .toString()
);

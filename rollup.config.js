/*
 * Copyright © 2017, Rezo Zero
 *
 * @file rollup.config.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const normalBundles = {
    input: 'src/bundle.js',
    output: [{
        file: 'dist/main.esm.js',
        format: 'esm'
    }, {
        file: 'dist/main.cjs.js',
        format: 'cjs'
    }, {
        file: 'dist/main.amd.js',
        format: 'amd'
    }, {
        file: 'dist/main.umd.js',
        format: 'umd',
        name: 'starting-blocks'
    }],
    plugins: [
        commonjs(), // prise en charge de require
        resolve(), // prise en charge des modules depuis node_modules
        babel({ // transpilation
            runtimeHelpers: true,
            exclude: 'node_modules/**'
        })
    ]
}

const es6Bundle = {
    input: 'src/bundle.js',
    output: [{
        file: 'dist/main.e6.js',
        format: 'esm'
    }],
    plugins: [
        commonjs(), // prise en charge de require
        resolve(), // prise en charge des modules depuis node_modules
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**',
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        esmodules: true
                    }
                }]
            ]
        })
    ]
}

export default [
    normalBundles,
    es6Bundle
]

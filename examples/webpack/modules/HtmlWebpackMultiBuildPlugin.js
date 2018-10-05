/*
 * Copyright © 2017, Rezo Zero
 *
 * @file HtmlWebpackMultiBuildPlugin.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

function HtmlWebpackMultiBuildPlugin(options) {
    this.options = options;
    this.js = [];
}

HtmlWebpackMultiBuildPlugin.prototype = {
    apply: function(compiler) {
        if (compiler.hooks) {
            // webpack 4 support
            compiler.hooks.compilation.tap('HtmlWebpackMultiBuildPlugin', compilation => {
                HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
                    'HtmlWebpackMultiBuildPlugin',
                    this.beforeHtmlGeneration.bind(this),
                );
            });
        } else {
            compiler.plugin('compilation', compilation => {
                compilation.plugin('html-webpack-plugin-before-html-generation', this.beforeHtmlGeneration.bind(this));
            });
        }
    },

    beforeHtmlGeneration: function(data, cb) {
        for (var jsName of data.assets.js) {
            if (!this.js.includes(jsName)) {
                this.js.push(jsName)
            }
        }

        data.plugin.options.modernScripts = this.js.filter((value) => value.indexOf('legacy') === -1);
        data.plugin.options.legacyScripts = this.js.filter((value) => value.indexOf('legacy') > 0);

        cb(null, data);
    }
};

module.exports = HtmlWebpackMultiBuildPlugin;

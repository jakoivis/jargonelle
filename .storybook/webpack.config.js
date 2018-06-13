// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

var webpack = require('webpack');
var path = require('path');

const PATHS = {
    nodeModules: path.join(__dirname, '../node_modules'),
    src: path.join(__dirname, '../src')
};

module.exports = {
    resolve: {
        modules: [
            PATHS.nodeModules,
            PATHS.src
        ],
        extensions: ['.js', '.jsx', '.styl', '.css']
    },
    plugins: [
        // your custom plugins
    ],
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader'],
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]"
                    }
                }
            }
        ],
    },
};

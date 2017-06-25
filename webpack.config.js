var webpack = require('webpack');
var path = require('path');
var name = 'jargonelle';

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var poststylus = require('poststylus');

const PATHS = {
    index: path.join(__dirname, 'src/index.jsx'),
    dist: path.join(__dirname, 'dist')
};

var config = {
    entry: [
        PATHS.index
    ],
    devtool: 'source-map',
    output: {
        path: PATHS.dista,
        filename: name + '.js',
        publicPath: '/',
        library: name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
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
            }
        ]
    }
};

var devConfig = {
    devServer: {
        host: process.env.HOST,
        port: process.env.PORT,
        inline: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'jargonelle',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [poststylus([ 'autoprefixer' ])]
                }
            }
        })
    ]
};

var prodConfig = {};

module.exports = (env) => {

    if (env === 'development') {
        return Object.assign(
            config,
            devConfig
        );
    }

    return Object.assign(
        config,
        prodConfig
    );
}
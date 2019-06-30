
const path = require('path');

const PATH_SRC = path.join(__dirname, '../src');

module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.modules.push(PATH_SRC);

    config.module.rules.push({
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
    });

    config.module.rules.push({
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
    });

    // config.module.rules.push({
    //     test: /\.(ttf|eot|woff|woff2)$/,
    //     use: {
    //         loader: "file-loader",
    //         options: {
    //             name: "fonts/[name].[ext]"
    //         }
    //     }
    // });

    return config;
};
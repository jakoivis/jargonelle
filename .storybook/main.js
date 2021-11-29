
const path = require('path');

module.exports = {
    stories: ['../stories/**/*.stories.@(js|mdx)'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-actions',
    ],
};
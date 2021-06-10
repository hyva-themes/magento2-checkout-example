// Import the Hyva Inheritance plugin
const HyvaInheritancePlugin = require('./webpack-hyva-inheritance-plugin');
const path = require('path');

// Define the original Hyva sources as a parent
// @todo: Make this configurable through `.env`
const parentPath = path.resolve("../../../../../vendor/hyva-themes/magento2-hyva-checkout/src/reactapp/src");

module.exports = {
    webpack: function(config, env) {
        const isEnvDevelopment = env === 'development';
        const isEnvProduction = env === 'production';
        const filename = isEnvProduction
            ? '../../view/frontend/web/js/react-checkout.js'
            : isEnvDevelopment && 'static/js/bundle.js';
        const chunkFilename = isEnvProduction
            ? '../../view/frontend/web/js/[name].chunk.js'
            : isEnvDevelopment && 'static/js/[name].chunk.js';

        // Override the various loader configurations, to allow for parsing the original Hyva sources as well
        config.module.rules[1].include = [
            parentPath,
            path.resolve(__dirname, 'src'),
        ];

        config.module.rules[2].oneOf[1].include = [
            parentPath,
            path.resolve(__dirname, 'src'),
        ];

        return {
            ...config,
            output: {
                ...config.output,
                filename,
                chunkFilename,
            },
            optimization: {
                ...config.optimization,
                runtimeChunk: false,
                splitChunks: {
                    ...config.optimization.splitChunks,
                    chunks: 'async',
                    name: false,
                },
            },
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    react: 'preact/compat',
                    'react-dom': 'preact/compat',
                    '@hyva/react-checkout': parentPath // Add an alias to convert paths to their parent source
                },
                plugins: [
                    // Include the Hyva Inheritance plugin
                    new HyvaInheritancePlugin({
                        parentPath,
                        childPath: path.resolve(__dirname, 'src')
                    }),
                ]
            }
        };
    },
    paths: function (paths) {
        paths.appPublic = path.resolve(parentPath, '..', 'public');
        return paths;
    },
}

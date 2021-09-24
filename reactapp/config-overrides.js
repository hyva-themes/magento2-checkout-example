const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { aliasDangerous } = require('react-app-rewire-alias/lib/aliasDangerous');
const HyvaInheritancePlugin = require('./webpack-hyva-inheritance-plugin');

const hyvaCheckoutVendorPath = path.resolve(
  '../../../../../vendor/hyva-themes/magento2-hyva-checkout/src/reactapp/src'
);

/**
 * CRA (create-react-app) supports only one source directory. aliasDangerous
 * allow us to refer the react components from the Hyvä Checkout module which
 * is placed inside vendor directory.
 *
 * See this: https://stackoverflow.com/a/66360740/2869218
 */
const aliasMap = {
  '@hyva/react-checkout': hyvaCheckoutVendorPath,
};

module.exports = function override(config, env) {
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';
  const filename = isEnvProduction
    ? '../../view/frontend/web/js/react-checkout.js'
    : isEnvDevelopment && 'static/js/bundle.js';
  const chunkFilename = isEnvProduction
    ? '../../view/frontend/web/js/[name].chunk.js'
    : isEnvDevelopment && 'static/js/[name].chunk.js';

  const baseConfig = {
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
      plugins: [
        /**
         * Allow us to modify only those React Component needs to be customized
         * by copy it over to the src directory.
         */
        new HyvaInheritancePlugin({
          parentPath: hyvaCheckoutVendorPath,
          childPath: path.resolve(__dirname, 'src'),
        }),
      ],
    },
  };

  if (isEnvProduction) {
    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    };
  }

  return aliasDangerous(aliasMap)(baseConfig);
};

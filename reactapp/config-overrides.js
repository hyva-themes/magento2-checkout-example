/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { aliasDangerous } = require('react-app-rewire-alias/lib/aliasDangerous');

const HyvaInheritancePlugin = require('./scripts/webpack-hyva-inheritance-plugin');
const cssFileNameUpdator = require('./scripts/react-app-rewire/css-file-name-updator');
const reactAppRewirePostCssApplier = require('./scripts/react-app-rewire/postcss-applier');

const hyvaCheckoutVendorPath = path.resolve(
  '../../../../../vendor/hyva-themes/magento2-react-checkout/src/reactapp/src'
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
  const isEnvProduction = env === 'production';
  const filename = isEnvProduction
    ? '../../view/frontend/web/js/react-checkout.js'
    : 'static/js/bundle.js';
  const chunkFilename = isEnvProduction
    ? '../../view/frontend/web/js/[name].chunk.js'
    : 'static/js/[name].chunk.js';

  const newConfig = {
    ...config,
    optimization: {
      ...config.optimization,
      runtimeChunk: false,
      splitChunks: {
        ...config.optimization.splitChunks,
        chunks: 'async',
        name: false,
      },
    },
    output: {
      ...config.output,
      filename,
      chunkFilename,
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
    newConfig.resolve.alias = {
      ...newConfig.resolve.alias,
      lodash: 'lodash-es',
      /**
       * Prevent React version mismatch between this checkout
       * and the one in vendor
       * See: https://github.com/hyva-themes/magento2-checkout-example/issues/19
       */
      react: path.resolve('./node_modules/preact/compat'),
      'react-dom': path.resolve('./node_modules/preact/compat'),
      /**
       * If you want to use the full React version instead of Preact,
       * comment out the two values above and enable the lines below
       */
      // react: path.resolve('./node_modules/react'),
      // 'react-dom': path.resolve('./node_modules/react-dom'),
    };
  }

  // Save css bundle into styles.css
  cssFileNameUpdator(newConfig, isEnvProduction);
  // Apply postcss.config.js
  reactAppRewirePostCssApplier(newConfig);

  return aliasDangerous(aliasMap)(newConfig);
};

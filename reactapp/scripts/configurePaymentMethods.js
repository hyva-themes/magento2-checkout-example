const fs = require('fs');
const util = require('./utility');

const paymentDirectoryPath = './src/paymentMethods/';

/**
 * Setting up custom payment methods into the react app section
 *
 * This will clone the payment methods repository specified under
 * `config.paymentMethodsRepo` section in package.json file into the
 * `src/paymentMethods`
 *
 * It will also populate `src/paymentMethods/customRenderers.js` which can be
 * used to port custom payment renderers into the react app.
 */
module.exports = (async () => {
  const paymentRepos = util.collectConfiguredReposFromEnv('paymentMethodsRepo');
  const paymentMethodList = Object.keys(paymentRepos);

  await util.cloneAndConfigureRepos(
    paymentRepos,
    paymentDirectoryPath,
    'payment method'
  );

  if (paymentMethodList.length) {
    let content = `/**
 * 📢 📢 📢 This file is autogenerated and may be overwritten. Handle with care. 🙅🏽 🙅🏽 🙅🏽
 *
 * When you have custom payment repo integration, then the content of this file
 * will be overwritten during performing "npm install". So, in most of the cases,
 * you don't need to alter the content of this file.
 *
 * But, if you have your own custom payment methods locally, then you need to
 * include them here as well. That is the only time you need to touch this file.
 */\n\n`;
    content += paymentMethodList
      .map(
        (method) => `import ${method}Renderers from './${method}/renderers';\n`
      )
      .join('');
    content += '\n';
    content += `export default {\n`;
    content += paymentMethodList
      .map((method) => `  ...${method}Renderers,\n`)
      .join('');
    content += '};\n';

    fs.writeFileSync(`${paymentDirectoryPath}customRenderers.js`, content);
  }

  console.log('Payment methods successfully added');
})();

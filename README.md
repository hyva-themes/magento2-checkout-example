# Hyvä CheckoutExample Module Template
## Magento 2 module template for extending upon the Hyvä React Checkout module

This is a Magento 2 module template that enables you to customize Hyvä React Checkout seamlessly. It adds a custom Webpack configuration, so that you can extend upon the React sources of the original React Checkout module. In effect, this allows for kind of a parent/child theming mechanism, not for the entire Hyvä theme, but only for the specific React sources in your custom checkout.

## Why do you need this?

The React Checkout is a great solution for checkout page in any Magento 2 based site. It contains a ReactApp which constitutes the checkout page. When you want to use Hyvä Checkout in your site, you will eventually come to a point where you want to work on the ReactApp embedded in it. This means you cannot now use Hyvä Checkout directly as a composer dependency in your project.

Currently, there are two ways to approach this issue. You can fork Hyvä Checkout repository and use the forked version in your project. You are now able to apply the customization to this forked version. Another approach would be setup Hyvä Checkout in the `app/code/Hyva/ReactCheckout` directory. In both cases, it will be difficult to get the updates in the original React Checkout repository. You need to manually port the changes.

This module template helps you in this situation. It allows you to use the Hyvä Checkout as a composer dependency. You are exclusively working on this module which actually resides in the `app/code` directory. It allows you to edit only those React Components you really need to customize it. Eventually, you know which all React files you have customized. Hyvä Checkout is now completely separate and you can bring the updates if you need it without any headaches.

We highly recommend going for this approach when it comes to customize Hyvä Checkout.

## Installation
- Install Hyvä Checkout via composer. You can find more details in the [**official documentation**](https://hyva-themes.github.io/magento2-react-checkout/installation/)
- Setup this Magento 2 module template in your project. We are naming the module `Hyva_CheckoutExample`.
    - Clone it into `app/code/Hyva/CheckoutExample`
    - Enable your module with `bin/magento module:enable Hyva_CheckoutExample`
    - Run setup upgrade with `bin/magento setup:upgrade`

- Setup ReactApp (See: [How to customize Hyvä Checkout](https://hyva-themes.github.io/magento2-react-checkout/customize/))
    - Specify payment methods repositories (if any) in `app/code/Hyva/CheckoutExample/reactapp/package.json`.
    - Navigate into `app/code/Hyva/CheckoutExample/reactapp`.
    - Run `npm install` (do not use `yarn`)

- Start ReactApp
    - Update `proxy` setting in `app/code/Hyva/CheckoutExample/reactapp/package.json` with the base url of your magento instance.
    - Copy the `env.example` file into `.env` and modify its contents
    - Run `npm run start`

Please remember this is a template. So you can name this module as you wish. There is no need to go on with the given name `Hyva_CheckoutExample`. If you have a different name for this template then, you need to update the module name at least in below files.

- registration.php
- composer.json
- etc/module.xml
- Change template as per your module name at `view/frontend/layout/hyva_reactcheckout_index.xml`
  
    ```
    <referenceBlock name="checkout.scripts" template="Hyva_CheckoutExample::react-script.phtml" />
    ```
- Change js file reference at `view/frontend/templates/react-script.phtml`

    ```
    newScript.src = '<?= $escaper->escapeUrl($block->getViewFileUrl('Hyva_CheckoutExample::js/react-checkout.js')); ?>';
    ```

## Copying React components
As an example you could copy the original `LoginForm.jsx` component and make some modifications to hit, like adding a simple `Hello World`. Copy the original path `vendor/hyva-themes/magento2-react-checkout/src/reactapp/src/components/login/components/LoginForm.jsx` into `app/code/Hyva/CheckoutExample/reactapp/src/components/login/components/LoginForm.jsx`.

Open up the React source and locate the lines including `import`:

```react
import Button from '../../common/Button';
import TextInput from '../../common/Form/TextInput';
import useLoginFormContext from '../hooks/useLoginFormContext';
import {__} from '../../../i18n';
```

Change these relative imports into the references to `@hyva/react-checkout`:

```react
import Button from '@hyva/react-checkout/components/common/Button';
import TextInput from '@hyva/react-checkout/components/common/Form/TextInput';
import useLoginFormContext from '@hyva/react-checkout/components/login/hooks/useLoginFormContext';
import {__} from '@hyva/react-checkout/i18n';
```

Note that the NPM package `@hyva/react-checkout` actually does not (yet) exist. It is a Webpack alias pointing to 
the path `vendor/hyva-themes/magento2-react-checkout/src/reactapp/src`.

## Payment Integrations
With the React Checkout, you may need to use existing payment repositories. They will work out of box with the React Checkout 
repository. But you may face issues when you use them inside the template. This is because it is failing to load the
relative imports. You need to use `@hyva/react-checkout` for all those non-resolving imports.

There will be solution for this problem in those repositories. So always pay attention in the payment repositories documentation.

## Credits
The brain behind this idea is [**Jisse Reitsma**](https://github.com/jissereitsma). You can find his original work here: [**Yireo_ExampleHyvaCheckout**](https://github.com/yireo-training/Yireo_ExampleHyvaCheckout).

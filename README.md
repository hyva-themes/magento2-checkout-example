# Yireo Example Hyva React Checkout
## Magento 2 module for extending upon the Hyva Checkout module

Yireo Example Hyva React Checkout? Yes, that's a lot of buzzwords. This example module adds a custom Webpack configuration, so that you can extend upon the React sources of the original Hyva Checkout module. In effect, this allows for kind of a parent/child theming mechanism, not for the entire Hyva theme, but only for the specific React sources in your custom checkout.  

## Usage as a proof-of-concept
- Clone it into `app/code/Yireo/ExampleHyvaCheckout`
- Enable your module with `./bin/magento module:enable Yireo_ExampleHyvaCheckout`
- Navigate into `app/code/Yireo/ExampleHyvaCheckout/reactapp`
    - Copy the `env.example` file into `.env` and modify its contents
    - Run `npm install` (do not use `yarn`)
    - Run `npm run app:start` 

## Usage in your project
- Copy these sources into your own module `YourVendor_YourModule`
- Follow the steps outlined in the proof-of-concept above

## Copying React components
As an example you could copy the original `LoginForm.jsx` component and make some modifications to hit, like adding a simple `Hello World`. Copy the original path `vendor/hyva-themes/magento2-hyva-checkout/src/reactapp/src/components/login/components/LoginForm.jsx` into `app/code/Yireo/ExampleHyvaCheckout/reactapp/src/components/login/components/LoginForm.jsx`.

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

Note that the NPM package `@hyva/react-checkout` actually does not (yet) exist. It is a Webpack alias pointing to the path `vendor/hyva-themes/magento2-hyva-checkout/src/reactapp/src`.

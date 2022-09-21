import React from 'react';
import 'react-app-polyfill/ie11';
import { createRoot } from 'react-dom/client';

import RootElement from '@hyva/react-checkout/utils/rootElement';
import CheckoutForm from '@hyva/react-checkout/components/CheckoutForm';
import AppDataProvider from '@hyva/react-checkout/context/App/AppDataProvider';
import CartDataProvider from '@hyva/react-checkout/context/Cart/CartDataProvider';
import CheckoutFormProvider from '@hyva/react-checkout/context/Form/CheckoutFormProvider';

import './index.css';

function Checkout() {
  return (
    <AppDataProvider>
      <CartDataProvider>
        <CheckoutFormProvider>
          <CheckoutForm />
        </CheckoutFormProvider>
      </CartDataProvider>
    </AppDataProvider>
  );
}

const root = createRoot(RootElement.getElement());

root.render(<Checkout />);

import React from 'react';
import 'react-app-polyfill/ie11';
import ReactDOM from 'react-dom';

import RootElement from '@hyva/react-checkout/utils/rootElement';
import CheckoutForm from '@hyva/react-checkout/components/CheckoutForm';
import StepProvider from '@hyva/react-checkout/context/Form/Step/StepProvider';
import AppDataProvider from '@hyva/react-checkout/context/App/AppDataProvider';
import CartDataProvider from '@hyva/react-checkout/context/Cart/CartDataProvider';
import CheckoutFormProvider from '@hyva/react-checkout/context/Form/CheckoutFormProvider';

function Checkout() {
  return (
    <AppDataProvider>
      <CartDataProvider>
        <CheckoutFormProvider>
          <StepProvider>
            <CheckoutForm />
          </StepProvider>
        </CheckoutFormProvider>
      </CartDataProvider>
    </AppDataProvider>
  );
}

ReactDOM.render(<Checkout />, RootElement.getElement());

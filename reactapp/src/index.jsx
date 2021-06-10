import React from 'react';
import 'react-app-polyfill/ie11';
import ReactDOM from 'react-dom';

import CheckoutForm from '@hyva/react-checkout/components/CheckoutForm';
import CheckoutFormProvider from '@hyva/react-checkout/context/Form/CheckoutFormProvider';
import StepProvider from '@hyva/react-checkout/context/Form/Step/StepProvider';
import CartDataProvider from '@hyva/react-checkout/context/Cart/CartDataProvider';
import AppDataProvider from '@hyva/react-checkout/context/App/AppDataProvider';
import RootElement from '@hyva/react-checkout/utils/rootElement';

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

import React from 'react';
import _get from 'lodash.get';

import Button from '@hyva/react-checkout/components/common/Button';
import TextInput from '@hyva/react-checkout/components/common/Form/TextInput';
import { __ } from '@hyva/react-checkout//i18n';
import useLoginFormContext from '@hyva/react-checkout/components/login/hooks/useLoginFormContext';
import useFormValidateThenSubmit from '@hyva/react-checkout/hook/useFormValidateThenSubmit';

function LoginForm() {
  const {
    fields,
    formId,
    editMode,
    formikData,
    submitHandler,
    handleKeyDown,
    setFieldValue,
    loginFormValues,
    validationSchema,
    isLoginFormTouched,
  } = useLoginFormContext();
  const customerWantsToSignIn = _get(loginFormValues, 'customerWantsToSignIn');
  const handleButtonClick = useFormValidateThenSubmit({
    formId,
    formikData,
    submitHandler,
    validationSchema,
  });

  if (!editMode) {
    return <></>;
  }

  return (
    <>
      <div className="py-2">
        <TextInput
          required
          type="email"
          label={__('Email')}
          name={fields.email}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('john.doe@gmail.com')}
        />

        {!customerWantsToSignIn && (
          <div
            role="button"
            tabIndex="0"
            className="py-3 text-sm text-center text-black underline cursor-pointer"
            onClick={() => {
              setFieldValue(fields.customerWantsToSignIn, true);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setFieldValue(fields.customerWantsToSignIn, true);
              }
            }}
          >
            {__('I will sign-in and checkout')}
          </div>
        )}

        {customerWantsToSignIn && (
          <div>
            <TextInput
              required
              type="password"
              autoComplete="on"
              label={__('Password')}
              name={fields.password}
              formikData={formikData}
              onKeyDown={handleKeyDown}
              placeholder={__('Password')}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="primary"
          click={handleButtonClick}
          disable={!isLoginFormTouched}
        >
          {customerWantsToSignIn ? __('Sign In') : __('Update')}
        </Button>
      </div>
    </>
  );
}

export default LoginForm;

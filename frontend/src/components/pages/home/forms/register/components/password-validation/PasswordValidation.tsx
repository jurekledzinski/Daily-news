import { passwordRules } from '@components/pages';
import { PasswordValidationProps } from './types';
import { useEffect } from 'react';
import { useValidationMeter, ValidationBlock, ValidationBlocks } from '@components/shared';
import { useWatch } from 'react-hook-form';

export const PasswordValidation = ({ control, getValues, trigger }: PasswordValidationProps) => {
  const password = useWatch({ control, name: 'password' });

  const { ruleResults } = useValidationMeter({
    formValues: getValues(),
    mapRules: passwordRules,
    value: password,
  });

  useEffect(() => {
    if (password) trigger('confirmPassword');
  }, [trigger, password]);

  return (
    <ValidationBlocks>
      <ValidationBlock isValid={ruleResults.length >= 1} color="red" label="Weak" />
      <ValidationBlock isValid={ruleResults.length >= 2} color="orange" label="Medium" />
      <ValidationBlock isValid={ruleResults.length >= 4} color="yellow" label="Strong" />
      <ValidationBlock isValid={ruleResults.length >= 5} color="green" label="Very strong" />
    </ValidationBlocks>
  );
};

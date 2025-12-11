import { FieldValues, useWatch } from 'react-hook-form';
import { PasswordValidationStatusProps } from './types';
import { useEffect } from 'react';
import { useValidationMeter, ValidationBlock, ValidationBlocks } from '@components/shared';

export const PasswordValidationStatus = <T extends FieldValues>({
  control,
  getValues,
  nameConfirmPassword,
  namePassword,
  passwordRules,
  trigger,
}: PasswordValidationStatusProps<T>) => {
  const password = useWatch({ control, name: namePassword });

  const { ruleResults } = useValidationMeter({
    formValues: getValues(),
    mapRules: passwordRules,
    value: password,
  });

  useEffect(() => {
    if (password) trigger(nameConfirmPassword);
  }, [nameConfirmPassword, trigger, password]);

  return (
    <ValidationBlocks>
      <ValidationBlock isValid={ruleResults.length >= 1} color="red" label="Weak" />
      <ValidationBlock isValid={ruleResults.length >= 2} color="orange" label="Medium" />
      <ValidationBlock isValid={ruleResults.length >= 4} color="yellow" label="Strong" />
      <ValidationBlock isValid={ruleResults.length >= 5} color="green" label="Very strong" />
    </ValidationBlocks>
  );
};

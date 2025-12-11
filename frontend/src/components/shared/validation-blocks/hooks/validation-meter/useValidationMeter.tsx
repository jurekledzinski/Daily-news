import { useMemo } from 'react';
import { UseValidationMeterProps } from './types';

export const useValidationMeter = <T,>({ formValues, mapRules, value }: UseValidationMeterProps<T>) => {
  const ruleResults = useMemo(() => {
    let validity: string[] = [];

    for (const key in mapRules) {
      const fn = mapRules[key as keyof typeof mapRules];

      if (fn(value, formValues) === true && key !== 'hasNoSpace') validity.push(key);
      else validity = validity.filter((item) => item !== key);
    }

    return validity;
  }, [formValues, mapRules, value]);

  return { ruleResults };
};

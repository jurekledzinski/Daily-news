import stylesInput from '../styles/Styles.module.css';
import { generateClassNames } from '@helpers';
import {
  CommonInputClassNames,
  InputBaseClassNames,
  InputClassNames,
  TextareaClassNames,
} from './types';

const commonClassNames: CommonInputClassNames = (params) => {
  const { size = 'size-md', isError, variant = 'basic', type } = params;

  return generateClassNames(stylesInput, {
    [type]: true,
    [`${type}-${size}`]: Boolean(size),
    [`${type}-${variant}`]: Boolean(variant),
    [`${type}-inValid`]: isError === true,
    [`${type}-valid`]: isError === false,
  });
};

export const inputBaseClassNames: InputBaseClassNames = (params) => {
  const { size = 'size-md', variant = 'basic', disabled } = params;

  return {
    fieldset: generateClassNames(stylesInput, {
      fieldset: true,
      [`fieldset-${size}`]: Boolean(size),
      [`fieldset-${variant}`]: Boolean(variant),
      'fieldset-disabled': Boolean(disabled),
    }),
    legend: commonClassNames({ ...params, type: 'legend' }),
  };
};

export const inputClassNames: InputClassNames = (params) => {
  return commonClassNames({ ...params, type: 'input' });
};

export const textareaClassNames: TextareaClassNames = (params) => {
  return commonClassNames({ ...params, type: 'textarea' });
};

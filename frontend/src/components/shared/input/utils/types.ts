import { InputBaseProps } from '../components';

type CommonParams = Pick<InputBaseProps, 'isError' | 'size' | 'variant' | 'disabled'>;

interface CommonParamsWithType extends CommonParams {
  type: 'input' | 'legend' | 'textarea';
}

export type InputBaseClassNames = (params: CommonParams) => {
  fieldset: string;
  legend: string;
};

export type InputClassNames = (params: CommonParams) => string;

export type TextareaClassNames = (params: CommonParams) => string;

export type CommonInputClassNames = (params: CommonParamsWithType) => string;

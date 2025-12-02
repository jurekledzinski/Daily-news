import { FormProps as RouterFormProps } from 'react-router';
import { Orientation } from '@types';

export interface FormProps extends RouterFormProps {
  orientation?: Orientation;
}

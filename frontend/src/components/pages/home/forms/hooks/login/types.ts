import { ActionData } from '@api';
import { Navigation } from 'react-router';
import { RegisterFormValues } from '../register';

export type LoginFormValues = Pick<RegisterFormValues, 'email' | 'password'>;

export type UseLoginFormProps = {
  onFailed: () => void;
  onSuccess: () => void;
  status: Navigation;
  action?: ActionData;
};

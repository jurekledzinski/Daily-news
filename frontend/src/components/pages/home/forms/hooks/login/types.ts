import { RegisterFormValues } from '../register';

export type LoginFormValues = Pick<RegisterFormValues, 'email' | 'password'>;

export type UseLoginFormProps = {
  onSuccess: () => void;
  status: 'idle' | 'loading' | 'submitting';
};

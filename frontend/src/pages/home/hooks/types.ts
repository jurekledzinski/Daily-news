import { FormLoginValues, FormResigsterValues } from '@/components/pages';
import { UseFormReset } from 'react-hook-form';

export type UseFetchUserDataProps = {
  isLoggedIn: boolean;
};

export type UseLoginFormProps = {
  error: { message: string; action: string } | null;
  onSuccess: (reset: UseFormReset<FormLoginValues>) => void;
  status: 'idle' | 'loading' | 'submitting';
};

export type UseLogoutUserProps = {
  onSuccess: () => void;
};

export type UseRegisterFormProps = {
  error: { message: string; action: string } | null;
  onSuccess: (reset: UseFormReset<FormResigsterValues>) => void;
  status: 'idle' | 'loading' | 'submitting';
};

import { UseFormReturn } from 'react-hook-form';
import { User } from '../../../../store';

export interface InputsProfile extends Omit<User, 'id'> {}

export type InputsPassword = {
  password: string;
  confirmPassword: string;
};

export type UpdateProfileFormProps = {
  isDisabled: boolean;
  methods: UseFormReturn<InputsProfile, unknown, undefined>;
  onSubmit: () => void;
  serverError: string | null;
};

export type ChangeUserPasswordProps = {
  methods: UseFormReturn<InputsPassword, unknown, undefined>;
  onSubmit: () => void;
  serverError: string | null;
};

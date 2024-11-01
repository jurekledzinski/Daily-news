import { UseFormReturn } from 'react-hook-form';
import { FormLoginValues, FormResigsterValues } from '../forms';

export type NavBarActionsProps = {
  isLoggedInUser: boolean;
  onBack: () => void;
  onClick: () => void;
};

export type NavBarAuthProps = {
  isLoggedInUser: boolean;
  modalLoginRef: React.MutableRefObject<HTMLDialogElement | null>;
  modalRegisterRef: React.MutableRefObject<HTMLDialogElement | null>;
  logout: () => void;
  onGetCookie: (action: string) => {
    message: string;
    action: string;
  } | null;
  onRemoveCookie: () => void;
  submitLogin: {
    methods: UseFormReturn<FormLoginValues, unknown, undefined>;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  };
  submitRegister: {
    methods: UseFormReturn<FormResigsterValues, unknown, undefined>;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  };
};

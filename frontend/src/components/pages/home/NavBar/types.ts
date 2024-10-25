import { UseFormReturn } from 'react-hook-form';
import { UserState } from '../../../../store';
import { FormLoginValues, FormResigsterValues } from '../forms';

export type NavBarActionsProps = {
  onBack: () => void;
  onClick: () => void;
  user: UserState['user'];
};

export type NavBarAuthProps = {
  modalLoginRef: React.MutableRefObject<HTMLDialogElement | null>;
  modalRegisterRef: React.MutableRefObject<HTMLDialogElement | null>;
  logout: () => void;
  user: UserState['user'];
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

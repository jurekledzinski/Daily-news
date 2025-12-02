import { ActionData } from '@api';
import { useModalControl } from '../modal-control';
import { User } from '@models';

export type UseAuthCallbacksProps = {
  action?: ActionData<User>;
  modal: ReturnType<typeof useModalControl>;
};

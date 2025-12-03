import { ActionData } from '@api';
import { useFetcher } from 'react-router';
import { useModalControl } from '../modal-control';
import { User } from '@models';

export type UseAuthCallbacksProps = {
  modal: ReturnType<typeof useModalControl>;
};

export type FetcherReset = ReturnType<typeof useFetcher<ActionData<User>>>['unstable_reset'];

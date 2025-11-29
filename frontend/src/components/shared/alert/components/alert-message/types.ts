import { Size } from '@types';

export type AlertMessageProps = {
  message: string;
  size?: Omit<Size, 'size-md' | 'size-lg'>;
};

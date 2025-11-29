import { AlertProps } from '../types';
import { Size } from '@types';

type AlertSize = { size?: Omit<Size, 'size-md' | 'size-lg'> };

type AlertIconParams = Pick<AlertProps, 'color'> & AlertSize;
type AlertParams = Omit<AlertProps, 'icon' | 'isClosable' | 'message'>;
type AlertMessageParams = AlertSize;

export type AlertClassNames = (params: AlertParams) => string | undefined;

export type AlertMessageClassNames = (params: AlertMessageParams) => string;

export type AlertIconClassNames = (params: AlertIconParams) => string;

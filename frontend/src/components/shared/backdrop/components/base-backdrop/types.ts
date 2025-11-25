import { BackdropProps } from '../../types';

export type BaseBackdropProps = Omit<BackdropProps, 'portal' | 'zIndex'>;

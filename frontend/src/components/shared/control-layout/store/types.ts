import { ControlLayoutProps } from '../types';

export type ContextControlLayout = Omit<ControlLayoutProps, 'chidren'>;

export type ControlLayoutProviderProps = {
  children: React.ReactNode;
  value: ContextControlLayout;
};

import { InputVariant, Size } from '@types';

export interface ControlLayoutProps {
  as?: 'input' | 'textarea';
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isEndIcon?: boolean;
  isError?: boolean;
  isPending?: boolean;
  isStartIcon?: boolean;
  isStatus?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  readOnly?: boolean;
  size?: Size;
  variant?: InputVariant;
}

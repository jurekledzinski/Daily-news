import { ModalFooterProps, ModalHeaderProps } from '../';

export interface ModalLayoutProps extends ModalFooterProps, ModalHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

import { BackdropProps } from './types';
import './Loader.css';

export const Backdrop = ({ children }: BackdropProps) => {
  return <div className="backdrop">{children}</div>;
};

import { TabCloseProps } from './types';
import './Tabs.css';

export const TabClose = ({ children, onClose }: TabCloseProps) => {
  return (
    <span className="tabs__close" onClick={(e) => onClose(e)}>
      {children}
    </span>
  );
};

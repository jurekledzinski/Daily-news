import { TabCloseProps } from './types';

export const TabClose = ({ children, onClose }: TabCloseProps) => {
  return (
    <div className="tabs__close" onClick={(e) => onClose(e)}>
      {children}
    </div>
  );
};

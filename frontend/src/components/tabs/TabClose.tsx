import { MouseEvent } from 'react';

type TabCloseProps = {
  children: React.ReactNode;
  onClose: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
};

export const TabClose = ({ children, onClose }: TabCloseProps) => {
  return (
    <div className="tabs__close" onClick={(e) => onClose(e)}>
      {children}
    </div>
  );
};

import { TabTextProps } from './types';

export const TabText = ({ children }: TabTextProps) => {
  return <span className="tabs__text">{children}</span>;
};

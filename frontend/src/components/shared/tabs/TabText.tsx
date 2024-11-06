import { TabTextProps } from './types';
import './Tabs.css';

export const TabText = ({ children }: TabTextProps) => {
  return <span className="tabs__text">{children}</span>;
};

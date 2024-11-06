import { TabsProps } from './types';
import './Tabs.css';

export const Tabs = ({ children }: TabsProps) => {
  return <div className="tabs">{children}</div>;
};

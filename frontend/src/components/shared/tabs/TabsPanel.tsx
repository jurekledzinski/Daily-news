import { TabsPanelProps } from './types';
import './Tabs.css';

export const TabsPanel = ({ children }: TabsPanelProps) => {
  return (
    <div className="tabs__panel" role="tabpanel">
      {children}
    </div>
  );
};

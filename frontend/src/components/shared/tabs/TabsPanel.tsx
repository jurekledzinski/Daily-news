import { TabsPanelProps } from './types';

export const TabsPanel = ({ children }: TabsPanelProps) => {
  return (
    <div className="tabs__panel" role="tabpanel">
      {children}
    </div>
  );
};

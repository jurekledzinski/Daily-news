type TabsPanelProps = {
  children: React.ReactNode;
};

export const TabsPanel = ({ children }: TabsPanelProps) => {
  return (
    <div className="tabs__panel" role="tabpanel">
      {children}
    </div>
  );
};

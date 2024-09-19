type TabsProps = {
  children: React.ReactNode;
};

export const Tabs = ({ children }: TabsProps) => {
  return <div className="tabs">{children}</div>;
};

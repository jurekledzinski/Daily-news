type TabTextProps = {
  children: React.ReactNode;
};

export const TabText = ({ children }: TabTextProps) => {
  return <span className="tabs__text">{children}</span>;
};

export type TabProps = {
  activeTab: string;
  children: React.ReactNode;
  id: string;
  onClick: (id: string) => void;
};

export type TabCloseProps = {
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
};

export type TabsProps = {
  children: React.ReactNode;
};

export type TabsListProps = {
  children: React.ReactNode;
};

export type TabsPanelProps = {
  children: React.ReactNode;
};

export type TabTextProps = {
  children: React.ReactNode;
};

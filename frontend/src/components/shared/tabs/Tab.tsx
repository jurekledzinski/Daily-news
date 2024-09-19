import { TabProps } from './types';

export const Tab = ({
  activeTab,
  children,
  id,
  onClick,
  ...props
}: TabProps) => {
  return (
    <button
      className={id === activeTab ? 'tabs__tab tabs__tab--active' : 'tabs__tab'}
      onClick={() => onClick(id)}
      {...props}
      role="tab"
    >
      {children}
    </button>
  );
};

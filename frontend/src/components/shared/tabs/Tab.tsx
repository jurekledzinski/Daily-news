import { TabProps } from './types';

export const Tab = ({
  activeTab,
  className,
  children,
  id,
  onClick,
  title,
  ...props
}: TabProps) => {
  return (
    <button
      className={[
        id === activeTab ? 'tabs__tab tabs__tab--active' : 'tabs__tab',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onClick(id)}
      {...props}
      role="tab"
      title={title}
    >
      {children}
    </button>
  );
};

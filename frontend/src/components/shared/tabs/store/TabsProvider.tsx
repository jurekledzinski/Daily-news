import { TabsContext } from './context';
import { TabsProviderProps } from './types';
import { useState } from 'react';

export const TabsProvider = ({ children, value }: TabsProviderProps) => {
  const [internalKey, setInternalKey] = useState<string | null>(null);

  const onSelectChange = (key: string) => {
    if (!value.selectedKey) setInternalKey(key);
    if (value.onSelectChange) value.onSelectChange(key);
  };

  return (
    <TabsContext.Provider
      value={{
        ...value,
        selectedKey: value.selectedKey || internalKey || value.defaultSelectedKey,
        onSelectChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

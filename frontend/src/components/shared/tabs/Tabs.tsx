import { TabsProps } from './types';
import { TabsProvider } from './store';

export const Tabs = ({ children, ...props }: TabsProps) => {
  return (
    <TabsProvider value={props}>
      <div>{children}</div>
    </TabsProvider>
  );
};

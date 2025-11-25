import { Outlet } from 'react-router';
import { Section } from '@guardian/content-api-models/v1/section';
import { Tab, Tabs, TabsList, TabsPanel } from '@components/shared';
import { tablistClassNames } from './utils';
import { TabsCategoriesProps } from './types';
import { useMemo } from 'react';
import { useTabsListSlide } from '../hooks';

export const TabsCategories = ({ categories, category, navigateCategory }: TabsCategoriesProps) => {
  const { isTabslistVisible, ref } = useTabsListSlide();
  const classNames = useMemo(() => tablistClassNames(isTabslistVisible), [isTabslistVisible]);

  return (
    <Tabs
      color="secondary"
      defaultSelectedKey={category}
      size="size-xs"
      selectedKey={category}
      onSelectChange={navigateCategory}
      variant="text"
    >
      <div ref={ref}></div>
      <TabsList className={classNames}>
        {(categories ?? []).map((category) => {
          const content = JSON.parse(category.content!) as Section;
          return <Tab key={category.id} id={category.id} label={content.webTitle} />;
        })}
      </TabsList>
      <TabsPanel>
        <Outlet />
      </TabsPanel>
    </Tabs>
  );
};

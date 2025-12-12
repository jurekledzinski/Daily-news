import { CarouselThumbnails, Tab, Tabs, TabsList, TabsPanel } from '@components/shared';
import { Outlet } from 'react-router';
import { SplideSlide } from '@splidejs/react-splide';
import { tablistClassNames } from './utils';
import { TabsCategoriesProps } from './types';
import { useMemo } from 'react';
import { useTabsListSlide } from '../hooks';
import type { Section } from '@guardian/content-api-models/v1/section';

export const TabsCategories = ({ categories, category, navigateCategory }: TabsCategoriesProps) => {
  const { isTabslistVisible, ref } = useTabsListSlide();
  const classNames = useMemo(() => tablistClassNames(isTabslistVisible), [isTabslistVisible]);
  const selectedIndex = useMemo(() => categories.findIndex((c) => c.id === category), [categories, category]);

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
        <CarouselThumbnails onReady={(splide) => splide.go(selectedIndex)}>
          {(categories ?? []).map((category) => {
            const content = JSON.parse(category.content!) as Section;
            return (
              <SplideSlide key={category.id} data-id={category.id}>
                <Tab key={category.id} id={category.id} label={content.webTitle} />
              </SplideSlide>
            );
          })}
        </CarouselThumbnails>
      </TabsList>
      <TabsPanel>
        <Outlet />
      </TabsPanel>
    </Tabs>
  );
};

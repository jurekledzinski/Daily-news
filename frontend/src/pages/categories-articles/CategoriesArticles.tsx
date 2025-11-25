import styles from './CategoriesArticles.module.css';
import { getLocalData } from '@helpers';
import { GridStackNode } from 'gridstack';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Section } from '@guardian/content-api-models/v1/section';
import { Tab, Tabs, TabsList, TabsPanel } from '@components/shared';
import { useState } from 'react';

export const CategoriesArticles = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [categories] = useState<GridStackNode[]>(() => getLocalData('categories'));

  const navigateCategory = (key: string) => {
    navigate(`/categories/${key}/articles`, { preventScrollReset: true, viewTransition: true });
  };

  return (
    <section className={styles.section}>
      <Tabs
        color="secondary"
        defaultSelectedKey={category}
        size="size-xs"
        selectedKey={category}
        onSelectChange={navigateCategory}
        variant="text"
      >
        <TabsList>
          {categories.map((category) => {
            const content = JSON.parse(category.content!) as Section;
            return <Tab key={category.id} id={category.id} label={content.webTitle} />;
          })}
        </TabsList>
        <TabsPanel>
          <Outlet />
        </TabsPanel>
      </Tabs>
    </section>
  );
};

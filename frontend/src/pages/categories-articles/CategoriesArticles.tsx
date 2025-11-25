import styles from './CategoriesArticles.module.css';
import { getLocalData } from '@helpers';
import { GridStackNode } from 'gridstack';
import { TabsCategories } from '@components/pages';
import { useNavigate, useParams } from 'react-router';
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
      <TabsCategories
        categories={categories}
        category={category}
        navigateCategory={navigateCategory}
      />
    </section>
  );
};

import styles from './CategoriesArticles.module.css';
import { getLocalData } from '@helpers';
import { GridStackNode } from 'gridstack';
import { TabsCategories } from '@components/pages';
import { useNavigateToCategory } from './hooks';
import { useParams } from 'react-router';
import { useState } from 'react';

export const CategoriesArticles = () => {
  const navigateCategory = useNavigateToCategory();
  const { category } = useParams<{ category: string }>();
  const [categories] = useState<GridStackNode[]>(() => getLocalData('categories'));

  return (
    <section className={styles.section}>
      <TabsCategories categories={categories} category={category} navigateCategory={navigateCategory} />
    </section>
  );
};

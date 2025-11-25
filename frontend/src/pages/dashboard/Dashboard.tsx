import styles from './Dashboard.module.css';
import { Aside, GridItem, GridLayout, useGridInitialize } from '@components/pages';
import { Box, Container, Heading, EmptyState } from '@components/shared';
import { useCallback, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import type { Section } from '@guardian/content-api-models/v1/section';

export const Dashboard = () => {
  const navigate = useNavigate();
  const categories = useLoaderData<{ data: Section[] }>();

  const { gridItemIds } = useGridInitialize({
    navigateArticles: useCallback((id) => navigate(`categories/${id}/articles`), [navigate]),
  });

  const sortedCategories = useMemo(
    () => (categories.data ?? []).sort((a, b) => a.id.localeCompare(b.id)),
    [categories.data]
  );

  return (
    <Container className={styles.section}>
      <Box className={styles.wrapper}>
        <Heading className={styles.title} level={4}>
          News Dashboard
        </Heading>
        <p className={styles.subTitle}>
          Drag categories from the sidebar to organize your news feeds
        </p>
        <GridLayout />
      </Box>
      <Aside>
        {/* {!sortedCategories.length && <EmptyState title="" />} */}
        {sortedCategories.map((item) => (
          <GridItem item={item} gridItemIds={gridItemIds} key={item.id} />
        ))}
      </Aside>
    </Container>
  );
};

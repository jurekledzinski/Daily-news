import styles from './Dashboard.module.css';
import { Aside, GridItem, GridLayout, useGridInitialize } from '@components/pages';
import { Box, Container, EmptyState, Heading } from '@components/shared';
import { useLoaderData } from 'react-router';
import { useNavigateToArticles, useSortedCategories } from './hooks';
import type { Section } from '@guardian/content-api-models/v1/section';

export const Dashboard = () => {
  const categories = useLoaderData<{ data: Section[] }>();
  const navigateArticles = useNavigateToArticles();
  const { gridItemIds } = useGridInitialize({ navigateArticles });
  const sortedCategories = useSortedCategories(categories.data);

  return (
    <Container className={styles.section}>
      <Box className={styles.wrapper}>
        <Heading className={styles.title} level={4}>
          News Dashboard
        </Heading>
        <p className={styles.subTitle}>
          Drag categories from the sidebar to organize your news feeds
        </p>
        <GridLayout>
          {!gridItemIds.length && (
            <EmptyState text="Drag categories here to view articles" src="/images/mouse.png" />
          )}
        </GridLayout>
      </Box>
      <Aside>
        {!sortedCategories.length && (
          <EmptyState
            text="API limit has been reached. Please try again later."
            src="/images/api-limit.png"
          />
        )}
        {sortedCategories.map((item) => (
          <GridItem item={item} gridItemIds={gridItemIds} key={item.id} />
        ))}
      </Aside>
    </Container>
  );
};

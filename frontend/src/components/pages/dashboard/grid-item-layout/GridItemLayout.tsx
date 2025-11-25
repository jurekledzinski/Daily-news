import styles from './GridItemLayout.module.css';
import { Button, Card, CardFooter, CardHeader, IconButton } from '@components/shared';
import { categoryInfo } from '../grid-layout';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { GridItemLayoutProps } from './types';
import type { Section } from '@guardian/content-api-models/v1/section';

export const GridItemLayout = ({
  data,
  navigateArticles,
  onRemoveGridItem,
}: GridItemLayoutProps) => {
  const parsedData = JSON.parse(data) as Section;
  const description = categoryInfo[parsedData.id as keyof typeof categoryInfo];

  return (
    <Card className={`${styles.container} ${styles[parsedData.id]}`}>
      <CardHeader className={styles.header}>
        <p className={styles.title}>{parsedData.webTitle}</p>
        {description ? <p className={styles.subTitle}>{description}</p> : null}
        <IconButton
          className={styles.closeButton}
          color="negative"
          icon={[faTrashAlt]}
          size="size-xxs"
          variant="text"
          onClick={() => onRemoveGridItem(parsedData.id)}
        />
      </CardHeader>
      <CardFooter className={styles.footer}>
        <Button
          className={styles.button}
          color="info"
          label="View All Articles"
          size="size-xs"
          onClick={() => navigateArticles(parsedData.id)}
        />
      </CardFooter>
    </Card>
  );
};

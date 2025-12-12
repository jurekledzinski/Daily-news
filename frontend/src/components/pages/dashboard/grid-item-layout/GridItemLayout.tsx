import { Button, Card, CardFooter, CardHeader, IconButton } from '@components/shared';
import { categoryInfo } from '../grid-layout';
import { faGripLines, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { gridCardImages } from '@/utils';
import { gridItemLayoutClassNames } from './utils/classNames';
import { GridItemLayoutProps } from './types';
import { useMemo } from 'react';
import type { Section } from '@guardian/content-api-models/v1/section';

export const GridItemLayout = ({ data, navigateArticles, onRemoveGridItem }: GridItemLayoutProps) => {
  const parsedData = JSON.parse(data) as Section;
  const description = categoryInfo[parsedData.id as keyof typeof categoryInfo];
  const classNames = gridItemLayoutClassNames({ id: parsedData.id });

  const src = useMemo(() => {
    const keyImage = parsedData.id.replace(/-(\w)/g, (_, c) => c.toUpperCase());
    return gridCardImages[keyImage as keyof typeof gridCardImages];
  }, [parsedData.id]);

  return (
    <Card className={classNames.gridItemLayout} style={{ backgroundImage: `url(${src})` }}>
      <CardHeader className={classNames.header}>
        <p className={classNames.title}>{parsedData.webTitle}</p>
        {description ? <p className={classNames.subTitle}>{description}</p> : null}
        <IconButton
          className={classNames.removeButton}
          color="negative"
          icon={[faTrashAlt]}
          size="size-xxs"
          variant="text"
          onClick={() => onRemoveGridItem(parsedData.id)}
        />
      </CardHeader>
      <CardFooter className={classNames.footer}>
        <Button
          className={classNames.redirectButton}
          color="info"
          label="View All Articles"
          size="size-xs"
          onClick={() => navigateArticles(parsedData.id)}
        />
        <IconButton
          className={classNames.gripHandle}
          color="white"
          icon={[faGripLines]}
          size="size-xxs"
          variant="text"
        />
      </CardFooter>
    </Card>
  );
};

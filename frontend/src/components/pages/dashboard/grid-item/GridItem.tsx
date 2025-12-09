import { categoryInfo } from '../grid-layout';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { gridItemClassNames } from './utils';
import { Icon } from '@/components/shared';
import { useItemDrop } from './hooks';
import type { GridItemProps } from './types';

export const GridItem = ({ item, gridItemIds }: GridItemProps) => {
  const classNames = gridItemClassNames({ id: item.id, gridItemIds });
  const gridItemRef = useItemDrop({ item });
  const description = categoryInfo[item.id as keyof typeof categoryInfo];

  return (
    <div className={classNames.gridItem} ref={gridItemRef}>
      <div className={classNames.icon}>
        <img className={classNames.image} src={`icons/${item.id}.png`} alt={item.webTitle} />
      </div>
      <div className={classNames.title}>{item.webTitle}</div>
      {description ? <div className={classNames.text}>{description}</div> : null}
      <div className={`${classNames.grip} drag-grid-item`}>
        <Icon icon={faGripLines} />
      </div>
    </div>
  );
};

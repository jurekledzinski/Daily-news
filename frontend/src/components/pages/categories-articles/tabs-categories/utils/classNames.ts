import styles from '../TabsCategories.module.css';
import { generateClassNames } from '@helpers';
import { TablistClassNames } from './types';

export const tablistClassNames: TablistClassNames = (isTabslistVisible: boolean) => {
  return generateClassNames(styles, {
    slide: !isTabslistVisible,
    tabsList: true,
  });
};

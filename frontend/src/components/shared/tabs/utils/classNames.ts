import tabStyles from '../components/tab/Tab.module.css';
import { generateClassNames } from '@helpers';
import { TabClassNames } from './types';

export const tabClassNames: TabClassNames = (params) => {
  const { color, id, selectedKey, variant } = params;

  return generateClassNames(tabStyles, {
    tab: true,
    active: id === selectedKey,
    [`${color}`]: Boolean(color),
    [`${variant}`]: Boolean(variant),
  });
};

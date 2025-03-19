import { getLocalData } from '@/helpers';
import { LayoutData, LocalData } from '@/components/pages';
import { UseSetLayout } from './types';

export const useSetLayout = ({ onSetLayout, onSetLocalData }: UseSetLayout) => {
  const handleSetLayout = (dataLayout: LayoutData) => {
    const localData = getLocalData();

    const transformData = Object.entries(dataLayout).reduce<LocalData[]>(
      (acc, curr) => {
        curr[1].forEach((category) => {
          const isExist = acc.find((item) => item.id === category.id);
          const inLocal = localData.find((i) => i.id === category.id);

          if (isExist) {
            const accData = acc.map((i) => {
              if (i.id === category.id) {
                return { ...i, ui: { ...i.ui, [curr[0]]: category.ui } };
              }
              return i;
            });

            return (acc = accData);
          }

          const singleCategory = {
            id: category.id ?? '',
            title: category.title,
            ui: { [curr[0]]: category.ui },
            articles: localData.length && inLocal ? inLocal.articles : [],
            listArticles:
              localData.length && inLocal ? inLocal.listArticles : [],
            page: localData.length && inLocal ? inLocal.page : '1',
            image: localData.length && inLocal ? inLocal.image : category.image,
          };

          const accData = [...acc, singleCategory];
          return (acc = accData);
        });

        return acc;
      },
      []
    );

    // setLocalData(transformData);
    // setLayout(dataLayout);
    onSetLocalData(transformData);
    onSetLayout(dataLayout);
  };

  return handleSetLayout;
};

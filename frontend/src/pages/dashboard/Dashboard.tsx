import { useEffect, useState } from 'react';
import './Dashboard.css';
import { Aside } from '../../components/pages';

import { GridLayout, LayoutData, LocalData } from '../../components/pages';

export const Dashboard = () => {
  const [layout, setLayout] = useState<LayoutData>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });

  const handleSetLayout = (dataLayout: LayoutData) => {
    const localData: LocalData[] =
      JSON.parse(localStorage.getItem('categories') ?? 'null') || [];

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
            scroll: localData.length && inLocal ? inLocal.scroll : 0,
            listArticles:
              localData.length && inLocal ? inLocal.listArticles : [],
            page: localData.length && inLocal ? inLocal.page : '1',
          };

          const accData = [...acc, singleCategory];
          return (acc = accData);
        });

        return acc;
      },
      []
    );

    localStorage.setItem('categories', JSON.stringify(transformData));
    setLayout(dataLayout);
  };

  useEffect(() => {
    const localData: LocalData[] =
      JSON.parse(localStorage.getItem('categories') ?? 'null') || [];
    if (!localData.length) return;

    const transformedData = localData.reduce<LayoutData>((acc, curr) => {
      let tempAcc: LayoutData = {};

      Object.entries(curr.ui).forEach((item) => {
        tempAcc = {
          ...tempAcc,
          [item[0]]: [{ id: curr.id ?? '', title: curr.title, ui: item[1] }],
        };
      });

      if (Object.keys(acc).length) {
        const accData = Object.entries(acc).map((i) => [
          i[0],
          [...i[1], tempAcc[i[0]][0]],
        ]);
        return (acc = Object.fromEntries(accData));
      } else {
        return (acc = tempAcc);
      }
    }, {});

    setLayout(transformedData);
  }, []);

  return (
    <section className="section section--dashboard">
      <GridLayout layout={layout} setLayout={handleSetLayout} />
      <Aside layout={layout} />
    </section>
  );
};

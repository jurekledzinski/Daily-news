import { categories } from '../../dummy-api';
import { useEffect, useState } from 'react';
import './Dashboard.css';

import {
  GridLayout,
  GridTemplateCard,
  LayoutData,
  LocalData,
} from '../../components/pages';

export const Dashboard = () => {
  const [data, setData] = useState<LayoutData>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });

  const handleSetData = (dataLayout: LayoutData) => {
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
            articles: localData.length ? inLocal?.articles ?? [] : [],
          };

          const accData = [...acc, singleCategory];
          return (acc = accData);
        });

        return acc;
      },
      []
    );

    localStorage.setItem('categories', JSON.stringify(transformData));
    setData(dataLayout);
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

    setData(transformedData);
  }, []);

  return (
    <section className="section section--dashboard">
      <GridLayout data={data} setData={handleSetData} />
      <div className="aside">
        {categories.map((section) => {
          const card = data.lg.find((cardItem) => cardItem.id === section.id);
          return (
            <GridTemplateCard
              data={section}
              key={section.id}
              isDisabled={card ? true : false}
            />
          );
        })}
      </div>
    </section>
  );
};

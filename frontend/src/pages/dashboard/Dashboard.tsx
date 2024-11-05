import { Aside } from '../../components/pages';
import { GridLayout, LayoutData, LocalData } from '../../components/pages';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import {
  getLocalData,
  handleAddCardOnTouch,
  setLocalData,
} from '../../helpers';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState<LayoutData>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });

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

    setLocalData(transformData);
    setLayout(dataLayout);
  };

  useEffect(() => {
    const localData = getLocalData();
    if (!localData.length) return;

    const transformedData = localData.reduce<LayoutData>((acc, curr) => {
      let tempAcc: LayoutData = {};

      Object.entries(curr.ui).forEach((item) => {
        tempAcc = {
          ...tempAcc,
          [item[0]]: [
            {
              id: curr.id ?? '',
              title: curr.title,
              ui: item[1],
              page: curr.page,
              image: curr.image,
            },
          ],
        };
      });

      if (Object.keys(acc).length && Object.keys(tempAcc).length) {
        const accData = Object.entries(acc).map((i) => {
          return [i[0], [...i[1], ...tempAcc[i[0]]]];
        });
        return (acc = Object.fromEntries(accData));
      } else {
        return (acc = tempAcc);
      }
    }, {});

    setLayout(transformedData);
  }, []);

  return (
    <section className="section section--dashboard">
      <GridLayout
        layout={layout}
        setLayout={handleSetLayout}
        onNavigate={(category, page) => {
          const url = `categories/${category}/articles`;
          const query = `page=${page ?? '1'}`;
          navigate({ pathname: url, search: query });
        }}
      />
      <Aside
        layout={layout}
        onClick={(data) => {
          handleAddCardOnTouch(data, layout, (newLayout) => {
            setLayout(newLayout);
            handleSetLayout(newLayout);
          });
        }}
      />
    </section>
  );
};

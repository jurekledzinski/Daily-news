import { cloneDeep } from 'lodash';
import { TabsCategoriesArticles } from '@components/pages';
import { useControlCloseSubTabs, useControlCloseTabs } from '@hooks/index';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoriesArticles.css';
import {
  getCurrentCategory,
  getLocalData,
  setLocalData,
} from '@helpers/global';

export const CategoriesArticles = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const decId = decodeURIComponent(id ?? '');
  const condtion = category && decId;
  const active = condtion ? [category, decId] : category ? [category] : [];
  const [state, setState] = useState(cloneDeep(getLocalData()));
  const [activeTabs, setActiveTabs] = useState<string[]>([...active]);

  const { handleCloseTab } = useControlCloseTabs({
    data: state,
    onChangeData: (data, id) => {
      const localData = getLocalData();
      const filteredData = localData.filter((category) => category.id !== id);
      setLocalData(filteredData);
      setState(data);
    },
    onRedirectOne: (category) => {
      const page = getCurrentCategory(category)?.page ?? '1';
      const url = `/categories/${category}/articles?page=${page}`;
      navigate(url, { replace: true });
    },
    onRedirectTwo: () => {
      navigate('/');
    },
    onSetActiveTabs: (value) => {
      setActiveTabs(value);
    },
  });

  const { handleCloseSubTab } = useControlCloseSubTabs({
    activeTabs,
    data: state,
    category: category ?? '',
    onChangeData: (data, id) => {
      const localData = getLocalData();
      const filteredData = localData.map((itemCategory) => {
        if (itemCategory.id === category) {
          return {
            ...itemCategory,
            articles: itemCategory.articles.filter((art) => art.id !== id),
          };
        }
        return itemCategory;
      });

      setLocalData(filteredData);

      setState((prev) =>
        prev.map((item) =>
          item.id === category ? { ...item, articles: data } : item
        )
      );
    },
    onRedirectOne: (category, id) => {
      const articleId = encodeURIComponent(id);
      const url = `/categories/${category}/articles/article/${articleId}`;
      navigate(url);
    },
    onRedirectTwo: (category) => {
      const page = getCurrentCategory(category)?.page ?? '1';
      navigate(`/categories/${category}/articles?page=${page}`);
    },
    onSetActiveTabs: (value) => {
      setActiveTabs(value);
    },
  });

  const handleAddSubArticle = (value: { id: string; title: string }) => {
    const localData = getLocalData();

    const filteredData = localData.map((itemCategory) =>
      itemCategory.id === category
        ? {
            ...itemCategory,
            articles: itemCategory.articles.some(
              (article) => article.id === value.id
            )
              ? itemCategory.articles
              : [...itemCategory.articles, value],
          }
        : itemCategory
    );

    setActiveTabs((prev) => [prev[0], value.id]);
    setLocalData(filteredData);
    setState(filteredData);
  };

  useEffect(() => {
    if (activeTabs.length) return;
    const condition = category && decId;
    const active = condition ? [category, decId] : category ? [category] : [];
    setActiveTabs(active);
  }, [activeTabs, category, decId]);

  return (
    <section
      className={
        id
          ? 'section sectiom--article-details'
          : 'section sectiom--grid-articles'
      }
    >
      <TabsCategoriesArticles
        activeTabs={activeTabs}
        handleAddSubArticle={handleAddSubArticle}
        handleCloseSubTab={handleCloseSubTab}
        handleCloseTab={handleCloseTab}
        onRedirectOne={(categoryArt) => {
          if (category === categoryArt && !id) return;

          const page = getCurrentCategory(categoryArt)?.page ?? '1';
          const url = `/categories/${categoryArt}/articles?page=${page}`;

          navigate(url, { preventScrollReset: true });
        }}
        onRedirectTwo={(categoryArt, idArticle) => {
          if (id && id === idArticle) return;

          const articleId = encodeURIComponent(idArticle);
          const url = `/categories/${categoryArt}/articles/article/${articleId}?page=1`;

          navigate(url, { preventScrollReset: true });
        }}
        onRedirectThree={() => {
          navigate('/', { preventScrollReset: true });
        }}
        onSetActiveTabs={(value) => setActiveTabs(value)}
        state={state}
      />
    </section>
  );
};

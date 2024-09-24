import { cloneDeep } from 'lodash';
import { LocalData, TabsCategoriesArticles } from '../../components/pages';
import { useControlCloseSubTabs, useControlCloseTabs } from '../../hooks';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const CategoriesArticles = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const decId = decodeURIComponent(id ?? '');

  const localData: LocalData[] =
    JSON.parse(localStorage.getItem('categories') ?? 'null') || [];

  const [state, setState] = useState(cloneDeep(localData));
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  const currentActiveTab = useMemo(
    () => (category && decId ? [category, decId] : category ? [category] : []),
    [category, decId]
  );

  const { handleCloseTab } = useControlCloseTabs({
    data: state,
    onChangeData: (data, id) => {
      const filteredData = localData.filter((category) => category.id !== id);
      localStorage.setItem('categories', JSON.stringify(filteredData));
      setState(data);
    },
    onRedirectOne: (category) => {
      navigate(`/categories/${category}/articles`, { replace: true });
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
      const filteredData = localData.map((itemCategory) => {
        if (itemCategory.id === category) {
          return {
            ...itemCategory,
            articles: itemCategory.articles.filter((art) => art.id !== id),
          };
        }
        return itemCategory;
      });

      localStorage.setItem('categories', JSON.stringify(filteredData));

      setState((prev) =>
        prev.map((item) =>
          item.id === category ? { ...item, articles: data } : item
        )
      );
    },
    onRedirectOne: (category, id) => {
      navigate(
        `/categories/${category}/articles/article/${encodeURIComponent(id)}`
      );
    },
    onRedirectTwo: (category) => {
      navigate(`/categories/${category}/articles`);
    },
    onSetActiveTabs: (value) => {
      setActiveTabs(value);
    },
  });

  const handleAddSubArticle = (value: { id: string; title: string }) => {
    const localData: LocalData[] =
      JSON.parse(localStorage.getItem('categories') ?? 'null') || [];

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

    localStorage.setItem('categories', JSON.stringify(filteredData));

    setState((prev) =>
      prev.map((item) =>
        item.id === category
          ? {
              ...item,
              articles: item.articles.some((article) => article.id === value.id)
                ? item.articles
                : [...item.articles, value],
            }
          : item
      )
    );
  };

  return (
    <section className="section">
      <TabsCategoriesArticles
        activeTabs={currentActiveTab}
        handleAddSubArticle={handleAddSubArticle}
        handleCloseSubTab={handleCloseSubTab}
        handleCloseTab={handleCloseTab}
        onRedirectOne={(category) => {
          navigate(`/categories/${category}/articles`);
        }}
        onRedirectTwo={(category, id) => {
          navigate(
            `/categories/${category}/articles/article/${encodeURIComponent(id)}`
          );
        }}
        onSetActiveTabs={(value) => {
          setActiveTabs(value);
        }}
        state={state}
      />
    </section>
  );
};

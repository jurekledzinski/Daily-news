import './CategoriesArticles.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { cloneDeep } from 'lodash';
import { LocalData, TabsCategoriesArticles } from '../../components/pages';
import { useControlCloseSubTabs, useControlCloseTabs } from '../../hooks';

export const CategoriesArticles = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();

  const localData: LocalData[] =
    JSON.parse(localStorage.getItem('categories') ?? 'null') || [];

  const [state, setState] = useState(cloneDeep(localData));
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  const currentActiveTab = useMemo(
    () => (category && id ? [category, id] : category ? [category] : []),
    [category, id]
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
        prev.map((item) => {
          if (item.id === category) {
            return { ...item, articles: data };
          }
          return item;
        })
      );
    },
    onRedirectOne: (category, id) => {
      navigate(`/categories/${category}/articles/article/${id}`);
    },
    onRedirectTwo: (category) => {
      navigate(`/categories/${category}/articles`);
    },
    onSetActiveTabs: (value) => {
      setActiveTabs(value);
    },
  });

  return (
    <section className="section">
      <TabsCategoriesArticles
        activeTabs={currentActiveTab}
        handleCloseSubTab={handleCloseSubTab}
        handleCloseTab={handleCloseTab}
        onRedirectOne={(category) => {
          navigate(`/categories/${category}/articles`);
        }}
        onRedirectTwo={(category, id) => {
          navigate(`/categories/${category}/articles/article/${id}`);
        }}
        onSetActiveTabs={(value) => {
          setActiveTabs(value);
        }}
        state={state}
      />
    </section>
  );
};

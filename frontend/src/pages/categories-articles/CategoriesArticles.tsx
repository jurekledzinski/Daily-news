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
  const [activeTabs, setActiveTabs] = useState(
    category && id ? [category, id] : category ? [category] : []
  );

  const active = useMemo(
    () => (category && id ? [category, id] : category ? [category] : []),
    [category, id]
  );

  const { handleCloseTab } = useControlCloseTabs({
    data: state,
    onChangeData: (data) => {
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

  console.log('activeTabs', activeTabs, active);

  const { handleCloseSubTab } = useControlCloseSubTabs({
    activeTabs,
    data: state,
    category: category ?? '',
    onChangeData: (data) => {
      setState((prev) =>
        prev.map((item) => {
          if (item.id === category) {
            return { ...item, articles: data };
          }
          return item;
        })
      );
    },
    onRedirectOne: (category, name) => {
      navigate(`/categories/${category}/articles/article/${name}`);
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
        activeTabs={active}
        // activeTabs={activeTabs}
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

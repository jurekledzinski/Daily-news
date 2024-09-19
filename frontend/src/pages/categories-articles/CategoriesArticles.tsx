import './CategoriesArticles.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { TabsCategoriesArticles } from '../../components/pages';
import { useControlCloseSubTabs, useControlCloseTabs } from '../../hooks';

const categories = [
  {
    id: 'about',
    category: 'About',
    articles: [
      { id: 'id1', title: 'About 1' },
      { id: 'id2', title: 'About 2' },
    ],
  },
  {
    id: 'news',
    category: 'News',
    articles: [
      { id: 'id11', title: 'News 1' },
      { id: 'id22', title: 'News 2' },
      { id: 'id33', title: 'News 3' },
      { id: 'id44', title: 'News 4' },
    ],
  },
  {
    id: 'sport',
    category: 'Sport',
    articles: [{ id: 'id111', title: 'Sport 1' }],
  },
  {
    id: 'animals-farmed',
    category: 'Animal farmed',
    articles: [{ id: 'id555', title: 'Animal 1' }],
  },
];

export const CategoriesArticles = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const [state, setState] = useState(cloneDeep(categories));
  const [activeTabs, setActiveTabs] = useState(
    category && id ? [category, id] : category ? [category] : []
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
        activeTabs={activeTabs}
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

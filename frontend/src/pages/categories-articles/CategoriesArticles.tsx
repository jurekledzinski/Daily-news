import './CategoriesArticles.css';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import {
  Tabs,
  TabsList,
  Tab,
  TabsPanel,
  TabClose,
  TabText,
} from '../../components/tabs';
import GridArticles from '../../components/grid-articles';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
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
      <Tabs>
        <TabsList>
          {state.map((item) => (
            <Tab
              activeTab={activeTabs[0]}
              id={item.id}
              key={item.id}
              onClick={() => {
                setActiveTabs([item.id]);
                navigate(`/categories/${item.id}/articles`);
              }}
            >
              <TabText>{item.category}</TabText>
              <TabClose onClose={(e) => handleCloseTab(e, item.id)}>x</TabClose>
            </Tab>
          ))}
        </TabsList>
        <TabsList>
          {Object.fromEntries(
            Object.entries(state).map((item) => [
              item[1].id,
              { articles: item[1].articles },
            ])
          )[activeTabs[0]].articles.map(({ id, title }) => (
            <Tab
              activeTab={activeTabs[1]}
              id={id}
              key={id}
              onClick={() => {
                const copy = activeTabs;
                copy[1] = id;
                setActiveTabs([...copy]);
                navigate(`/categories/${activeTabs[0]}/articles/article/${id}`);
              }}
            >
              <TabText>{title}</TabText>
              <TabClose onClose={(e) => handleCloseSubTab(e, id)}>x</TabClose>
            </Tab>
          ))}
        </TabsList>
        {activeTabs.length > 1 ? (
          <TabsPanel>
            <Outlet />
          </TabsPanel>
        ) : (
          <TabsPanel>
            <GridArticles />
          </TabsPanel>
        )}
      </Tabs>
    </section>
  );
};

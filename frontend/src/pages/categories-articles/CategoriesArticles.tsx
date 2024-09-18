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
import { MouseEvent, useState } from 'react';
import { cloneDeep } from 'lodash';

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
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(cloneDeep(categories));
  const [activeTabs, setActiveTabs] = useState(
    category && id ? [category, id] : category ? [category] : []
  );

  console.log('activeTabs ---', activeTabs);
  console.log('state', state);

  const handleCloseTab = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    const index = state.findIndex((i) => i.id === id);
    const filterState = cloneDeep(state).filter((i) => i.id !== id);
    const move = index <= 0 ? 0 : Math.min(index, filterState.length - 1);

    if (filterState.length) {
      const name = filterState[move].id;
      setActiveTabs([name]);
      setState(filterState);
      navigate(`/categories/${name}/articles`, { replace: true });
    } else {
      setActiveTabs([]);
      setState([]);
      navigate('/');
    }
  };

  const handleCloseSubTab = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    id: string
  ) => {
    const copyState = Object.entries(cloneDeep(categories));
    const objState = Object.fromEntries(
      copyState.map((item) => [item[1].id, { articles: item[1].articles }])
    );
    const articles = objState[category as keyof typeof objState].articles;
    const index = articles.findIndex((i) => i.id === id);
    const filterArticles = articles.filter((i) => i.id !== id);
    const move = index <= 0 ? 0 : Math.min(index, filterArticles.length - 1);
    console.log('move sub', move);

    if (filterArticles.length) {
      const name = filterArticles[move].id;
      const copy = activeTabs;
      copy[1] = name;
      setActiveTabs([...copy]);
    } else {
      navigate(`/categories/${category}/articles`);
    }
  };

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
          <TabsPanel>Grid articles</TabsPanel>
        )}
      </Tabs>
    </section>
  );
};

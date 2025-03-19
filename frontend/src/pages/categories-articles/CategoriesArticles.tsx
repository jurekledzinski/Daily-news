import { TabsCategoriesArticles } from '@components/pages';
import { useControlTabs } from './hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
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
  const [state, setState] = useState(getLocalData());
  const [activeTabs, setActiveTabs] = useState<string[]>([...active]);

  const { handleAddSubArticle, handleCloseSubTab, handleCloseTab } =
    useControlTabs({
      activeTabs,
      category: category ?? '',
      data: getLocalData(),
      onAddSubArticle: (data, id) => {
        setActiveTabs((prev) => [prev[0], id]);
        setLocalData(data);
        setState(data);
      },
      onChangeData: (data) => {
        setLocalData(data);
        setState(data);
      },
      onRedirectOne: (url) => navigate(url, { replace: true }),
      onRedirectTwo: (url) => navigate(url),
      onSetActiveTabs: (value) => setActiveTabs(value),
    });

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
        handleAddSubArticle={(value) =>
          handleAddSubArticle(value, category ?? '')
        }
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

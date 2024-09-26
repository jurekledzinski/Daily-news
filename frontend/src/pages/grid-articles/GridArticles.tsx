import { Card, LocalData } from '../../components/pages';
import { loaderArticles } from '../../api';
import { uniqBy } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetchOnScroll } from '../../hooks';
import { UseOutletContext } from '../../types/global';
import './GridArticles.css';
import {
  getCurrentCategory,
  getFormatedData,
  getLocalData,
  setLocalData,
} from '../../helpers';
import {
  useLoaderData,
  useOutletContext,
  useSearchParams,
  useParams,
  Params,
} from 'react-router-dom';

export const GridArticles = () => {
  const { category } = useParams() as Params;
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<LocalData['listArticles']>([]);
  const page = useRef<number>(1);
  const context = useOutletContext<UseOutletContext>();

  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderArticles>>
  >;

  useFetchOnScroll({
    onChangeVisible: useCallback(
      (value) => {
        if (!state.length) return;
        const currentPage = Number(searchParams.get('page'));
        if (data.response.pages === currentPage) return;
        page.current = currentPage;
        page.current += 1;

        if (value) {
          setSearchParams({ page: `${page.current}` }, { replace: true });
        }
      },
      [data.response.pages, setSearchParams, searchParams, state]
    ),
    target: context.footerRef,
    threshold: 0,
  });

  useEffect(() => {
    const formatedData = data.response.results.map((i) => getFormatedData(i));
    setState((prev) => uniqBy([...prev, ...formatedData], 'id'));

    const localData = getLocalData();

    const updateData = localData.map((itemCategory) => {
      return itemCategory.id === category
        ? {
            ...itemCategory,
            listArticles: uniqBy(
              [...itemCategory.listArticles, ...formatedData],
              'id'
            ),
            page: searchParams.get('page'),
          }
        : itemCategory;
    });

    setLocalData(updateData);
  }, [category, data, searchParams]);

  useEffect(() => {
    const currentCategory = getCurrentCategory(category ?? '');

    if (currentCategory) {
      setState(uniqBy([...currentCategory.listArticles], 'id'));
    } else {
      setState([]);
    }
  }, [category]);

  return (
    <div className="grid-articles">
      {state.map((article) => (
        <Card
          key={article.id}
          handleAddSubArticle={context.handleAddSubArticle}
          article={article}
        />
      ))}
    </div>
  );
};

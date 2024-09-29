import { Card, LocalData } from '../../components/pages';
import { loaderArticles } from '../../api';
import { uniqBy } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetchOnScroll, useScrollToggle } from '../../hooks';
import { UseOutletContext } from '../../types/global';
import './GridArticles.css';
import {
  getCurrentCategory,
  getFormatedData,
  getLocalData,
  setLocalData,
  updateLocalData,
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
  const context = useOutletContext<UseOutletContext>();
  const firstChildRef = useRef<HTMLDivElement | null>(null);

  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderArticles>>
  >;

  useScrollToggle({
    onChangeVisible: (value) => {
      if (!context.headerRef.current) return;
      if (!context.tabsListContainerRef.current) return;

      if (value) {
        context.headerRef.current.classList.remove('slide');
        context.tabsListContainerRef.current.classList.remove('slide');
      } else {
        context.headerRef.current.classList.add('slide');
        context.tabsListContainerRef.current.classList.add('slide');
      }
    },
    target: firstChildRef,
    threshold: [0.5, 1.0],
  });

  useFetchOnScroll({
    onChangeVisible: useCallback(
      (value) => {
        if (!state.length) return;
        const currentPage = Number(searchParams.get('page')) || 1;
        if (data.response.pages === currentPage) return;

        if (value) {
          const nextPage = currentPage + 1;
          setSearchParams({ page: `${nextPage}` }, { replace: true });
        }
      },
      [data.response.pages, setSearchParams, searchParams, state]
    ),
    target: context.footerRef,
  });

  useEffect(() => {
    if (!category) return;
    const currentCategory = getCurrentCategory(category ?? '');
    if (!currentCategory) return;
    const formatedData = data.response.results.map((i) => getFormatedData(i));

    setState((prev) =>
      uniqBy([...prev, ...currentCategory.listArticles, ...formatedData], 'id')
    );

    const localData = getLocalData();

    const updateData = updateLocalData(
      localData,
      category,
      formatedData,
      searchParams
    );

    setLocalData(updateData);
  }, [category, data, searchParams]);

  return (
    <div className="grid-articles">
      {state.map((article, index) => (
        <Card
          key={article.id}
          handleAddSubArticle={context.handleAddSubArticle}
          article={article}
          ref={index === 0 ? firstChildRef : null}
        />
      ))}
    </div>
  );
};

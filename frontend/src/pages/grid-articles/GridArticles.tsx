import { Card, LocalData } from '@/components/pages';
import { checkIsExistArticle, useLoadGridArticles } from './hooks';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCurrentCategory } from '@/helpers';
import { loaderArticles } from '@/api';
import { NoDataMessage } from '@/components/shared';
import { useCallback, useRef, useState } from 'react';
import { useFetchOnScroll } from '@/hooks';
import { UseOutletContext } from '@/types';
import './GridArticles.css';
import {
  useLoaderData,
  useOutletContext,
  useSearchParams,
  useParams,
  Params,
} from 'react-router-dom';

export const GridArticles = () => {
  const { category } = useParams() as Params;
  const currentCategory = getCurrentCategory(category ?? '');
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<Record<string, LocalData['listArticles']>>(
    {}
  );

  const context = useOutletContext<UseOutletContext>();
  const firstChildRef = useRef<HTMLDivElement | null>(null);

  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderArticles>>
  >;

  useFetchOnScroll({
    onChangeVisible: useCallback(
      (value) => {
        if (!data || !value) return;

        const currentPage = Number(searchParams.get('page')) || 1;
        if (data.response.pages === currentPage) return;

        const nextPage = currentPage + 1;
        setSearchParams({ page: `${nextPage}` }, { replace: true });
      },
      [data, setSearchParams, searchParams]
    ),
  });

  useLoadGridArticles({
    category,
    data,
    searchParams,
    onSetState: useCallback(
      (articles) => {
        if (!category) return;

        const isExist = checkIsExistArticle(state[category], articles);
        if (!isExist) return;

        setState((prev) => {
          return {
            ...prev,
            [category]: articles,
          };
        });
      },
      [category, state]
    ),
  });

  if (!data) {
    return (
      <NoDataMessage className="articles">
        <FontAwesomeIcon icon={faNewspaper} />
        <p>No articles</p>
      </NoDataMessage>
    );
  }

  return (
    <div
      className={
        currentCategory && currentCategory.articles.length
          ? 'grid-articles grid-articles__sub-articles'
          : 'grid-articles'
      }
    >
      {category && state[category] && state[category].length
        ? state[category].map((article, index) => (
            <Card
              key={article.id}
              handleAddSubArticle={context.handleAddSubArticle}
              article={article}
              ref={index === 0 ? firstChildRef : null}
            />
          ))
        : category &&
          state[category] && (
            <NoDataMessage className="articles">
              <FontAwesomeIcon icon={faNewspaper} />
              <p>No articles</p>
            </NoDataMessage>
          )}
    </div>
  );
};

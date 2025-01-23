import { Card, LocalData } from '@components/pages';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loaderArticles } from '@api/index';
import { NoDataMessage } from '@components/shared';
import { useCallback, useRef, useState } from 'react';
import { useFetchOnScroll, useLoadGridArticles } from '@hooks/index';
import { UseOutletContext } from '../../types/global';
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

        setState((prev) => {
          return {
            ...prev,
            [category]: articles,
          };
        });
      },
      [category]
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
    <div className="grid-articles">
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

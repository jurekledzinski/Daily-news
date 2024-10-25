import { Backdrop, Loader, NoDataMessage } from '../../components/shared';
import { Card, LocalData } from '../../components/pages';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loaderArticles } from '../../api';
import { useCallback, useRef, useState } from 'react';
import { useFetchOnScroll, useLoadGridArticles } from '../../hooks';
import { UseOutletContext } from '../../types/global';
import './GridArticles.css';
import {
  useLoaderData,
  useOutletContext,
  useSearchParams,
  useParams,
  Params,
  useNavigation,
} from 'react-router-dom';
import { getCurrentCategory } from '../../helpers';

export const GridArticles = () => {
  const { category } = useParams() as Params;
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<Record<string, LocalData['listArticles']>>(
    {}
  );
  const context = useOutletContext<UseOutletContext>();
  const firstChildRef = useRef<HTMLDivElement | null>(null);
  const navigation = useNavigation();

  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderArticles>>
  >;

  useFetchOnScroll({
    onChangeVisible: useCallback(
      (value) => {
        if (!value) return;

        const currentPage = Number(searchParams.get('page')) || 1;
        if (data.response.pages === currentPage) return;

        const nextPage = currentPage + 1;
        setSearchParams({ page: `${nextPage}` }, { replace: true });
      },
      [data.response.pages, setSearchParams, searchParams]
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

  return (
    <div
      className={
        category && getCurrentCategory(category)?.articles.length
          ? 'grid-articles grid-articles--sub-tabs'
          : 'grid-articles'
      }
    >
      {navigation.state === 'idle' ? (
        category && state[category] ? (
          state[category].length ? (
            state[category].map((article, index) => (
              <Card
                key={article.id}
                handleAddSubArticle={context.handleAddSubArticle}
                article={article}
                ref={index === 0 ? firstChildRef : null}
              />
            ))
          ) : (
            <NoDataMessage className="articles">
              <FontAwesomeIcon icon={faNewspaper} />
              <p>No articles</p>
            </NoDataMessage>
          )
        ) : (
          <Backdrop>
            <Loader className="fixed" />
          </Backdrop>
        )
      ) : (
        <Backdrop>
          <Loader className="fixed" />
        </Backdrop>
      )}
    </div>
  );
};

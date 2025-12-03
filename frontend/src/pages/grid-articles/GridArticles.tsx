import styles from './GridArticles.module.css';
import { CardArticle } from '@components/pages';
import { EmptyState, Loader, LoadMoreButton } from '@components/shared';
import { SearchResponse } from '@guardian/content-api-models/v1/SearchResponse';
import { URLS } from '@api';
import { useInfiniteQueryFetch, useLoadMoreData } from '@hooks';
import { useNavigateToDetailsArticle } from './hooks';
import { useParams } from 'react-router';

export const GridArticles = () => {
  const navigateDetailsArticle = useNavigateToDetailsArticle();
  const { category } = useParams<{ category: string }>();

  const {
    loadedData,
    hasNextPage,
    isFetching,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    isError,
  } = useInfiniteQueryFetch<SearchResponse['results']>({
    query: category,
    queryKey: ['list-articles', category],
    url: (query, pageParam) => URLS.GET_ARTICLES(query, String(pageParam)),
  });

  const { loadMoreData } = useLoadMoreData({ param: category, fetchNextPage });

  if (isError) {
    return <EmptyState text="Failed to load articles." src="/info/article.png" />;
  }

  if (!isFetching && !isPending && loadedData.length === 0) {
    return <EmptyState text="No articles found." src="/info/article.png" />;
  }

  return (
    <>
      <div className={styles.grid}>
        {(isFetching || isPending) && <Loader position="viewport" />}
        {loadedData.map((article, i) => (
          <CardArticle
            article={article}
            key={`${article.webUrl}-${i}`}
            onReadMore={navigateDetailsArticle}
          />
        ))}
      </div>

      {!!category && hasNextPage && !isPending && (
        <LoadMoreButton isLoading={isFetchingNextPage} onClick={loadMoreData} />
      )}
    </>
  );
};

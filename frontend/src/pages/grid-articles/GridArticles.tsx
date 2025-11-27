import styles from './GridArticles.module.css';
import { Button, ButtonGroup, EmptyState, Loader } from '@components/shared';
import { CardArticle } from '@components/pages';
import { SearchResponse } from '@guardian/content-api-models/v1/SearchResponse';
import { URLS } from '@api';
import { useInfiniteQueryFetch, usePageSearchParam, usePersistedScrollPage } from '@hooks';
import { useNavigateToDetailsArticle } from './hooks';

export const GridArticles = () => {
  const navigateDetailsArticle = useNavigateToDetailsArticle();
  const { saveInLocalstoragePage } = usePersistedScrollPage();
  const { page, params, setPage } = usePageSearchParam();

  const { allData, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isPending } =
    useInfiniteQueryFetch<SearchResponse['results']>({
      query: params.category,
      queryKey: ['list-articles', params.category],
      url: (query, pageParam) => URLS.GET_ARTICLES(query!, String(pageParam)),
    });

  if (!allData.length && !isFetching && !isPending) {
    return <EmptyState text="No articles found." src="/images/api-limit.png" />;
  }

  return (
    <>
      <div className={styles.grid}>
        {(isFetching || isPending) && <Loader position="viewport" />}
        {allData?.map((article, i) => (
          <CardArticle article={article} key={article.id + i} onReadMore={navigateDetailsArticle} />
        ))}
      </div>

      {!!params.category && hasNextPage && !isPending && (
        <ButtonGroup className="mt-sm" justify="justify-center" fullWidth>
          <Button
            color="info"
            isLoading={isFetchingNextPage}
            label={isFetchingNextPage ? 'Loading more...' : 'Load more ...'}
            onClick={() => {
              fetchNextPage();
              setPage(page);
              saveInLocalstoragePage('pages', params.category!, page + 1);
            }}
            type="button"
            variant="outlined"
          />
        </ButtonGroup>
      )}
    </>
  );
};

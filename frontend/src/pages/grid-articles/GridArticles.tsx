import styles from './GridArticles.module.css';
import { CardArticle } from '@components/pages';
import { EmptyState } from '@components/shared';
import { SearchResponse } from '@guardian/content-api-models/v1/SearchResponse';
import { useFetchOnScroll } from '@hooks';
import { useLoaderData, useSearchParams } from 'react-router';

export const GridArticles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const articles = useLoaderData<SearchResponse>();

  useFetchOnScroll({
    onReachBottom: () => {
      const page = Number(searchParams.get('page') ?? '1');
      setSearchParams({ page: String(page + 1) });
    },
  });

  //   czasem error gdy szybko przełączasz taby

  if (!articles?.results?.length) {
    return <EmptyState text="No articles found." src="/images/api-limit.png" />;
  }

  return (
    <div className={styles.grid}>
      {(articles?.results ?? []).map((article) => (
        <CardArticle article={article} key={article.id} />
      ))}
    </div>
  );
};

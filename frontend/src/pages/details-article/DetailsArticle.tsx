import { Article } from '@components/pages';
import { Asset } from '@guardian/content-api-models/v1/asset';
import { Container, EmptyState } from '@components/shared';
import { useLoaderData } from 'react-router';
import '@components/pages/details-article/article/Article.css';
import type { Content } from '@guardian/content-api-models/v1/content';

export const DetailsArticle = () => {
  const article = useLoaderData<{ data: Content & { image: Asset }; success: boolean }>();

  if (!article.success) {
    return <EmptyState text="No article found." src="/info/article.png" />;
  }

  return (
    <Container className="container-details">
      <Article article={article.data} />
    </Container>
  );
};

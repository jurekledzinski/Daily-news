import styles from './DetailsArticle.module.css';
import { ActionData } from '@api';
import { Article, ArticleComments } from '@components/pages';
import { Comment as CommentType } from '@models';
import { Container, EmptyState } from '@components/shared';
import { DetailsPageLoader } from './types';
import { useActionData, useLoaderData } from 'react-router';
import '@components/pages/details-article/article/Article.css';

export const DetailsArticle = () => {
  const action = useActionData<ActionData<CommentType>>();
  const loader = useLoaderData<DetailsPageLoader>();

  if (!loader.article.success) {
    return <EmptyState text="No article found." src="/info/article.png" />;
  }

  return (
    <Container className={styles.container}>
      <Article article={loader.article.data} />
      <ArticleComments action={action} articleId={loader.article.data.id} token={loader.token.data} />
    </Container>
  );
};

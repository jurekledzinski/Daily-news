import styles from './DetailsArticle.module.css';
import { Alert, AlertIcon, AlertMessage, Comment, Container, EmptyState } from '@components/shared';
import { Article, CommentForm, CommentsSection, useComment } from '@components/pages';
import { Asset } from '@guardian/content-api-models/v1/asset';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { formatDateLocalString, optionsFormatDate1 } from '@helpers';
import { useLoaderData } from 'react-router';
import '@components/pages/details-article/article/Article.css';
import type { Content } from '@guardian/content-api-models/v1/content';

const userId = '';

export const DetailsArticle = () => {
  const article = useLoaderData<{ data: Content & { image: Asset }; success: boolean }>();
  const form = useComment({ articleId: '', onSuccess: () => {}, status: 'idle', userId });

  const createAt = formatDateLocalString({
    date: new Date(),
    options: optionsFormatDate1,
  });

  if (!article.success) {
    return <EmptyState text="No article found." src="/info/article.png" />;
  }

  return (
    <Container className={styles.container}>
      <Article article={article.data} />
      {Boolean(!userId) && (
        <Alert fullWidth color="info" variant="outlined">
          <AlertIcon icon={faLock} color="info" />
          <AlertMessage message="Sign in to add comments" />
        </Alert>
      )}
      {Boolean(userId) && (
        <CommentsSection>
          <CommentForm controls={form.methods} isPending={false} onSubmit={form.onSubmit} />
          <Comment
            comment={{
              createdAt: createAt,
              likes: 123,
              text: 'Finally, someone covering this in a balanced way. Well done!',
              user: 'Joe Doe',
            }}
          />
        </CommentsSection>
      )}
    </Container>
  );
};

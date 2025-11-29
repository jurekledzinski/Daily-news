import styles from './DetailsArticle.module.css';
import { Article, CommentForm, CommentsSection, useComment } from '@components/pages';
import { Asset } from '@guardian/content-api-models/v1/asset';
import { Comment, Container, EmptyState } from '@components/shared';
import { formatDateLocalString, optionsFormatDate1 } from '@helpers';
import { useLoaderData } from 'react-router';
import '@components/pages/details-article/article/Article.css';
import type { Content } from '@guardian/content-api-models/v1/content';

export const DetailsArticle = () => {
  const article = useLoaderData<{ data: Content & { image: Asset }; success: boolean }>();
  const form = useComment({ articleId: '', onSuccess: () => {}, status: 'idle', userId: '' });

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
      <CommentsSection>
        <CommentForm
          controls={form.methods}
          isPending={false}
          onSubmit={form.onSubmit}
        ></CommentForm>
        <Comment
          comment={{
            createdAt: createAt,
            likes: 123,
            text: 'Finally, someone covering this in a balanced way. Well done!',
            user: 'Joe Doe',
          }}
        />
      </CommentsSection>
    </Container>
  );
};

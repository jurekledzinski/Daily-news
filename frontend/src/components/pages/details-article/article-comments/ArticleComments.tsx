import styles from '../comments-section/CommentsSection.module.css';
import { ArticleCommentsProps } from './types';
import { Comment as CommentType } from '@models';
import { CommentForm, useComment } from '../forms';
import { CommentsSection } from '../comments-section';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { URLS } from '@api';
import { useCommentCallbacks, useFormatComments } from '../hooks';
import { useInfiniteQueryFetch, useLoadMoreData } from '@hooks';
import { useNavigation } from 'react-router';
import { useUserStore } from '@store';
import { Alert, AlertIcon, AlertMessage, Comment, Heading, LoadMoreButton } from '@components/shared';

export const ArticleComments = ({ action, articleId, token }: ArticleCommentsProps) => {
  const { state } = useUserStore();
  const status = useNavigation();
  const { failedAddComment, successAddComment } = useCommentCallbacks({ action });
  const form = useComment({
    articleId,
    userId: state.user?.id,
    onFailed: failedAddComment,
    onSuccess: successAddComment,
    action,
    status,
    token,
  });

  const { loadedData, hasNextPage, isPending, isFetchingNextPage, fetchNextPage } =
    useInfiniteQueryFetch<CommentType>({
      query: articleId,
      queryKey: ['list-comments', articleId],
      url: (query, pageParam) => URLS.GET_COMMENTS(query!, String(pageParam)),
    });

  const { loadMoreData } = useLoadMoreData({ fetchNextPage, param: articleId });

  const comments = useFormatComments(loadedData);

  return (
    <CommentsSection>
      {!state.user && (
        <Alert fullWidth color="info" variant="outlined">
          <AlertIcon icon={faLock} color="info" />
          <AlertMessage message="Sign in to add comments" />
        </Alert>
      )}
      {state.user && (
        <Heading className={styles.header} level={5}>
          Comments
        </Heading>
      )}
      {!!state.user && (
        <CommentForm controls={form.methods} isPending={status.state === 'submitting'} onSubmit={form.onSubmit} />
      )}
      {comments.map((comment) => (
        <Comment key={comment.createdAt} comment={comment} />
      ))}
      {hasNextPage && !isPending && <LoadMoreButton isLoading={isFetchingNextPage} onClick={loadMoreData} />}
    </CommentsSection>
  );
};

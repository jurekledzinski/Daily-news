import { createComment, updateLikesComment } from './apiCalls';
import { ICommentCreate, ILikes } from './types';
import { LoaderFunctionArgs, Params, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { invalidateQueries, refetchQueries } from '../helpers';

export const actionDetailsArticle =
  (queryClient: QueryClient) =>
  async ({ params, request }: LoaderFunctionArgs<unknown>) => {
    const { id } = params as Params;
    const articleId = decodeURIComponent(id ?? '');
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? '1';
    const pageReply = url.searchParams.get('page_reply') ?? '1';

    const data = await request.formData();
    const actionType = data.get('actionType');

    if (actionType === 'create-comment') {
      return actionCreateComment(queryClient, data, articleId, page);
    } else if (actionType === 'create-reply') {
      return actionCreateCommentReply(queryClient, data, articleId, page, '1');
    } else if (actionType === 'update-likes') {
      return actionUpdateLikesComment(data, articleId, page, pageReply);
    }
  };

export const actionCreateComment = async (
  queryClient: QueryClient,
  data: FormData,
  articleId: string,
  page: string
) => {
  data.delete('actionType');
  const newComment = Object.fromEntries(data) as unknown as ICommentCreate;
  await createComment(newComment);

  await invalidateQueries(queryClient, ['list-comments', articleId, page]);
  await refetchQueries(queryClient, ['list-comments', articleId, page]);

  return redirect(window.location.pathname);
};

export const actionCreateCommentReply = async (
  queryClient: QueryClient,
  data: FormData,
  articleId: string,
  page: string,
  pageReply: string
) => {
  data.delete('actionType');
  const newReply = Object.fromEntries(data) as unknown as ICommentCreate;
  await createComment(newReply);
  const parentId = newReply.parentCommentId ?? '';

  await invalidateQueries(queryClient, ['list-comments', articleId, page]);
  await refetchQueries(queryClient, ['list-comments', articleId, page]);

  await invalidateQueries(queryClient, [
    'list-comment-replies',
    articleId,
    pageReply,
    parentId,
  ]);
  await refetchQueries(queryClient, [
    'list-comment-replies',
    articleId,
    pageReply,
    parentId,
  ]);

  return redirect(
    `${window.location.pathname}?comment_id=${newReply.parentCommentId}`
  );
};

export const actionUpdateLikesComment = async (
  data: FormData,
  articleId: string,
  page: string,
  pageReply: string
) => {
  data.delete('actionType');
  const comment = Object.fromEntries(data) as unknown as ILikes;

  console.log('comment action', comment);

  await updateLikesComment(articleId, comment);

  console.log('like action', window.location.pathname);

  if (comment.parentCommentId === 'null') {
    return redirect(`${window.location.pathname}?page=${page}`);
  }

  return redirect(
    `${window.location.pathname}?comment_id=${comment.parentCommentId}&page_reply=${pageReply}`
  );
};

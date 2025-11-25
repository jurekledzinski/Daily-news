import { ActionCreateComment, ActionCreateCommentReply, ActionUpdateLikesComment } from './types';
import { Comment, Likes } from '@models';
import { createComment, updateLikesComment } from '../api-calls';
import { formatDataToObject, queryInvalidate, validateAction } from './helpers';
import { LoaderFunctionArgs, Params, redirect } from 'react-router';
import { showSuccessToast } from '@helpers';

export const actionDetailsArticle =
  () =>
  async ({ params, request }: LoaderFunctionArgs<unknown>) => {
    const { id } = params as Params;
    const articleId = decodeURIComponent(id ?? '');
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? '1';
    const pageReply = url.searchParams.get('page_reply') ?? '1';

    const data = await request.formData();
    const actionType = data.get('actionType');

    if (actionType === 'create-comment') {
      return actionCreateComment({ data, articleId, page });
    } else if (actionType === 'create-reply') {
      return actionCreateCommentReply({ data, articleId, page, pageReply: '1' });
    } else if (actionType === 'update-likes') {
      return actionUpdateLikesComment({ data, articleId, page, pageReply });
    }
  };

export const actionCreateComment: ActionCreateComment = async ({ data, articleId, page }) => {
  data.delete('actionType');
  const newComment = formatDataToObject<Omit<Comment, 'id'>>(data);
  const result = await createComment(newComment);

  queryInvalidate(['list-comments', articleId, page]);
  queryInvalidate(['crsf-token']);

  validateAction(result, 'create-comment');

  showSuccessToast('Comment added successfully!');

  return redirect(window.location.pathname);
};

export const actionCreateCommentReply: ActionCreateCommentReply = async ({
  data,
  articleId,
  page,
  pageReply,
}) => {
  data.delete('actionType');
  const newReply = formatDataToObject<Omit<Comment, 'id'>>(data);
  const result = await createComment(newReply);
  const parentId = newReply.parentCommentId ?? '';

  queryInvalidate(['list-comments', articleId, page]);
  queryInvalidate(['list-comment-replies', articleId, pageReply, parentId]);
  queryInvalidate(['crsf-token']);

  validateAction(result, 'create-reply');

  showSuccessToast('Comment added successfully!');

  const redirectTo = `${window.location.pathname}?comment_id=${newReply.parentCommentId}`;

  return redirect(redirectTo);
};

export const actionUpdateLikesComment: ActionUpdateLikesComment = async ({
  data,
  articleId,
  page,
  pageReply,
}) => {
  data.delete('actionType');
  const comment = formatDataToObject<Likes>(data);
  const result = await updateLikesComment({ articleId, body: comment });

  if (comment.parentCommentId === 'null') {
    const redirectTo = `${window.location.pathname}?page=${page}`;

    validateAction(result, 'update-likes');

    queryInvalidate(['list-comments', articleId, page]);

    return redirect(redirectTo);
  }

  const redirectTo = `${window.location.pathname}?comment_id=${comment.parentCommentId}&page_reply=${pageReply}`;

  validateAction(result, 'update-likes');

  const parentId = comment.parentCommentId ?? '';

  queryInvalidate(['list-comment-replies', articleId, pageReply, parentId]);

  return redirect(redirectTo);
};

import { ActionCreateComment } from './types';
import { ActionFunction } from 'react-router';
import { Comment } from '@models';
import { createComment, setActionResponse } from '../api-calls';
import { formatDataToObject, queryInvalidate } from './helpers';

export const actionDetailsArticle: ActionFunction = async ({ params, request }) => {
  const articleId = decodeURIComponent(params.id ?? '');
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';

  const data = await request.formData();
  const actionType = data.get('actionType');
  const ctx = { data, articleId, page };

  if (actionType === 'create-comment') return actionCreateComment(ctx);
};

export const actionCreateComment: ActionCreateComment = async ({ data, articleId }) => {
  data.delete('actionType');
  const newComment = formatDataToObject<Omit<Comment, 'id'>>(data);
  const result = await createComment(newComment);

  queryInvalidate(['list-comments', articleId]);

  return setActionResponse('create-comment', result);
};

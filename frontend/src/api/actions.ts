import { LoaderFunctionArgs } from 'react-router-dom';
import { createComment } from './apiCalls';
import { IComment } from './types';

export const actionCreateComment = async ({
  request,
}: LoaderFunctionArgs<unknown>) => {
  const data = await request.formData();
  const newComment = Object.fromEntries(data) as IComment;
  const result = await createComment(newComment);
  console.log('result action create from fetch', result);
  return true;
};

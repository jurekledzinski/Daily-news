import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { createComment } from './apiCalls';

export const actionCreateComment = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs<unknown>) => {
  console.log('fire action add comment', request);
  console.log('fire action params', params);
  console.log('fire action context', context);
  const data = await request.formData();
  const newComment = Object.fromEntries(data);
  console.log('newComment', newComment);
  const comment = await createComment(newComment);
  return true;
};

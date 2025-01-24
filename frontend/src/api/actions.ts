import { invalidateQueries, setResponse } from '@helpers/index';
import { LoaderFunctionArgs, Params, redirect } from 'react-router-dom';
import { queryClient as useQueryClient } from '@/main';
import { toast } from 'react-toastify';
import type { QueryClient } from '@tanstack/react-query';
import {
  CommentCreate,
  CSRFToken,
  DataLogin,
  DataPassword,
  DataProfile,
  Likes,
  User,
} from './types';
import {
  createComment,
  updateLikesComment,
  deleteUserAccount,
  updateUserProfile,
  changeUserPassword,
  registerUser,
  loginUser,
  logoutUser,
} from './apiCalls';

// ----------------- Actions comment -----------------

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
      return actionCreateComment(data, articleId, page);
    } else if (actionType === 'create-reply') {
      return actionCreateCommentReply(data, articleId, page, '1');
    } else if (actionType === 'update-likes') {
      return actionUpdateLikesComment(data, articleId, page, pageReply);
    }
  };

export const actionCreateComment = async (
  data: FormData,
  articleId: string,
  page: string
) => {
  data.delete('actionType');
  const newComment = Object.fromEntries(data) as unknown as CommentCreate;
  const result = await createComment(newComment);

  useQueryClient.invalidateQueries({
    queryKey: ['list-comments', articleId, page],
  });
  useQueryClient.refetchQueries({
    queryKey: ['list-comments', articleId, page],
  });
  useQueryClient.invalidateQueries({ queryKey: ['crsf-token'] });

  const redirectTo = window.location.pathname;

  if ('message' in result && !result.success) {
    return {
      message: result.message,
      action: 'create-comment',
    };
  }

  toast.success('Comment added successfully!', {
    position: 'top-right',
  });

  return redirect(redirectTo);
};

export const actionCreateCommentReply = async (
  data: FormData,
  articleId: string,
  page: string,
  pageReply: string
) => {
  data.delete('actionType');
  const newReply = Object.fromEntries(data) as unknown as CommentCreate;
  const result = await createComment(newReply);
  const parentId = newReply.parentCommentId ?? '';

  useQueryClient.invalidateQueries({
    queryKey: ['list-comments', articleId, page],
  });

  useQueryClient.refetchQueries({
    queryKey: ['list-comments', articleId, page],
  });

  useQueryClient.invalidateQueries({
    queryKey: ['list-comment-replies', articleId, pageReply, parentId],
  });

  useQueryClient.refetchQueries({
    queryKey: ['list-comment-replies', articleId, pageReply, parentId],
  });

  useQueryClient.invalidateQueries({ queryKey: ['crsf-token'] });

  const redirectTo = `${window.location.pathname}?comment_id=${newReply.parentCommentId}`;

  if ('message' in result && !result.success) {
    return {
      message: result.message,
      action: 'create-reply',
    };
  }

  toast.success('Comment added successfully!', {
    position: 'top-right',
  });

  return redirect(redirectTo);
};

export const actionUpdateLikesComment = async (
  data: FormData,
  articleId: string,
  page: string,
  pageReply: string
) => {
  data.delete('actionType');
  const comment = Object.fromEntries(data) as unknown as Likes;

  const result = await updateLikesComment({ articleId, body: comment });

  if (comment.parentCommentId === 'null') {
    const redirectTo = `${window.location.pathname}?page=${page}`;

    if ('message' in result && !result.success) {
      return {
        message: result.message,
        action: 'update-likes',
      };
    }

    useQueryClient.invalidateQueries({
      queryKey: ['list-comments', articleId, page],
    });

    useQueryClient.refetchQueries({
      queryKey: ['list-comments', articleId, page],
    });

    return redirect(redirectTo);
  }

  const redirectTo = `${window.location.pathname}?comment_id=${comment.parentCommentId}&page_reply=${pageReply}`;

  if ('message' in result && !result.success) {
    return {
      message: result.message,
      action: 'update-likes',
    };
  }

  const parentId = comment.parentCommentId ?? '';

  useQueryClient.invalidateQueries({
    queryKey: ['list-comment-replies', articleId, pageReply, parentId],
  });

  useQueryClient.refetchQueries({
    queryKey: ['list-comment-replies', articleId, pageReply, parentId],
  });

  return redirect(redirectTo);
};

// ----------------- Actions user profile -----------------

export const actionProfileUser = async ({
  params,
  request,
}: LoaderFunctionArgs<unknown>) => {
  const { id } = params as Params;
  if (!id) return;
  const data = await request.formData();
  const actionType = data.get('actionType');

  if (actionType === 'update-profile') {
    return actionUpdateUserProfile(data, id);
  } else if (actionType === 'change-password') {
    return actionChangeUserPassword(data, id);
  } else if (actionType === 'delete-user-account') {
    return actionDeleteUserAccount(data, id);
  }
};

const actionUpdateUserProfile = async (data: FormData, id: string) => {
  data.delete('actionType');
  const dataProfile = Object.fromEntries(data) as unknown as DataProfile;

  const result = await updateUserProfile({ id, body: dataProfile });

  useQueryClient.removeQueries({ queryKey: ['user'] });
  useQueryClient.invalidateQueries({ queryKey: ['crsf-token'] });

  if ('message' in result && !result.success) {
    return {
      message: result.message,
      action: 'update-profile',
    };
  }

  toast.success('Profile updated successfully!', {
    position: 'top-right',
    toastId: 'update-profile',
  });

  const redirectTo = window.location.pathname;

  return redirect(redirectTo);
};

const actionChangeUserPassword = async (data: FormData, id: string) => {
  data.delete('actionType');
  const dataPassword = Object.fromEntries(data) as unknown as DataPassword;

  const result = await changeUserPassword({ id, body: dataPassword });

  useQueryClient.removeQueries({ queryKey: ['user'] });
  useQueryClient.invalidateQueries({ queryKey: ['crsf-token'] });

  if ('message' in result && !result.success) {
    return {
      message: result.message,
      action: 'change-password',
    };
  }

  toast.success('Password changed successfully!', {
    position: 'top-right',
  });

  const redirectTo = window.location.pathname;

  return redirect(redirectTo);
};

const actionDeleteUserAccount = async (data: FormData, id: string) => {
  data.delete('actionType');
  const deleteData = Object.fromEntries(data) as unknown as CSRFToken;

  const result = await deleteUserAccount({ id, token: deleteData.csrfToken });

  useQueryClient.invalidateQueries({ queryKey: ['user'] });

  if ('message' in result && !result.success) {
    return {
      message: result.message,
      action: 'delete-user-account',
    };
  }

  toast.success('Your account has been successfully deleted.', {
    position: 'top-right',
  });

  return redirect('/');
};

// ----------------- Actions register -----------------

export const actionHome =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs<unknown>) => {
    const data = await request.formData();
    const actionType = data.get('actionType');

    if (actionType === 'register-user') {
      return actionRegisterUser(data);
    } else if (actionType === 'login-user') {
      return actionLoginUser(queryClient, data);
    } else if (actionType === 'logout-user') {
      return actionLogoutUser();
    }
  };

export const actionRegisterUser = async (data: FormData) => {
  data.delete('actionType');
  const newUser = Object.fromEntries(data) as unknown as User;

  const result = await registerUser(newUser);

  const redirectTo = window.location.pathname;

  return setResponse('register-user', redirect, result, redirectTo);
};

export const actionLoginUser = async (
  queryClient: QueryClient,
  data: FormData
) => {
  data.delete('actionType');

  const user = Object.fromEntries(data) as unknown as DataLogin;

  const result = await loginUser(user);

  await invalidateQueries(queryClient, ['user']);

  const redirectTo = window.location.pathname;
  return setResponse('login-user', redirect, result, redirectTo);
};

export const actionLogoutUser = async () => {
  const result = await logoutUser({});

  useQueryClient.invalidateQueries({ queryKey: ['user'] });

  const redirectTo = window.location.pathname;
  return setResponse('logout-user', redirect, result, redirectTo);
};

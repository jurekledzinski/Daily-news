import { ActionData } from '@/types';
import { DetailsArticle } from './DetailsArticle';
import { formatSearchQuery, getCookie } from '@/helpers';
import { LoaderData } from './types';
import { useCallback } from 'react';
import { useFetchProtection } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import {
  APIResPagination,
  Comment,
  CommentAndReplies,
  fetchApi,
  URLS,
} from '@/api';
import {
  useActionData,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export const RootDetailsArticle = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const articleIdDecode = decodeURIComponent(id ?? '');
  const articleIdEncode = encodeURIComponent(id ?? '');
  const commentPage = searchParams.get('page') ?? '1';
  const commentId = searchParams.get('comment_id') ?? 'initial';
  const commentReplyPage = searchParams.get('page_reply') ?? '1';
  const actionData = useActionData() as ActionData;
  const loaderData = useLoaderData() as LoaderData;
  const isLoggedIn = getCookie('tsge');
  const dataToken = useFetchProtection({ isLoggedIn: Boolean(isLoggedIn) });

  const dataComment = useQuery<APIResPagination<Comment[]>>({
    queryKey: ['list-comments', articleIdDecode, commentPage],
    queryFn: async () =>
      await fetchApi({
        url: URLS.GET_COMMENTS(articleIdEncode, commentPage),
        mode: 'cors',
        credentials: 'include',
      }),
    enabled: Boolean(loaderData.detailsArticle),
  });

  const dataReplies = useQuery<APIResPagination<CommentAndReplies[]>>({
    queryKey: [
      'list-comment-replies',
      articleIdDecode,
      commentReplyPage,
      commentId,
    ],
    queryFn: async () =>
      await fetchApi({
        url: URLS.GET_COMMENT_REPLIES(
          articleIdEncode,
          commentId,
          commentReplyPage
        ),
        mode: 'cors',
        credentials: 'include',
      }),
    enabled: Boolean(loaderData.detailsArticle),
  });

  return (
    <DetailsArticle
      articleId={articleIdDecode}
      actionData={actionData}
      comments={dataComment}
      commentsReplies={dataReplies}
      loaderData={loaderData.detailsArticle}
      token={dataToken.token}
      onSetSearchParams={useCallback(
        (value, options) => setSearchParams(value, options),
        [setSearchParams]
      )}
      onShowReplies={(commentId) => {
        const currentParams = formatSearchQuery(searchParams, [
          ['comment_id', commentId],
          ['page_reply', '1'],
        ]);
        setSearchParams(currentParams);
      }}
      onShowMoreReplies={(parentCommentId, page) => {
        const currentParams = formatSearchQuery(searchParams, [
          ['comment_id', parentCommentId],
          ['page_reply', (page + 1).toString()],
        ]);
        setSearchParams(currentParams);
      }}
      searchParams={searchParams}
    />
  );
};

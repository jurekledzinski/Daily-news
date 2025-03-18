import { ActionData, UseOutletContext } from '../../types';
import { ArticleDetails } from '@components/pages';
import { cloneDeep } from 'lodash';
import { CommentsWithReplies, NoDataMessage } from '@components/shared';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  APIResPagination,
  loaderDetailsArticle,
  URLS,
  Comment,
} from '@api/index';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@store/index';
import './DetailsArticle.css';
import {
  getCookie,
  getDetailsArticleImageData,
  updateNestedRepliesLikes,
} from '@helpers/index';
import {
  useAddComment,
  useFetchOnScroll,
  useFetchProtection,
  useLoadComments,
  useUpdateLikes,
} from '@hooks/index';
import {
  Params,
  useLoaderData,
  useParams,
  useSearchParams,
  useActionData,
  useOutletContext,
} from 'react-router-dom';

type LoaderData = Awaited<ReturnType<ReturnType<typeof loaderDetailsArticle>>>;

export const DetailsArticle = () => {
  const [stateComments, setStateComments] = useState<
    Record<string, CommentsWithReplies[]>
  >({});
  const { id } = useParams() as Params;
  const { state } = useUserStore();
  const articleId = decodeURIComponent(id ?? '');
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useLoaderData() as LoaderData;
  const isLoggedIn = getCookie('tsge');
  const dataToken = useFetchProtection({ isLoggedIn: Boolean(isLoggedIn) });
  const actionData = useActionData() as ActionData;
  const context = useOutletContext<UseOutletContext>();
  const commentsPage = searchParams.get('page') ?? '1';
  const commentId = searchParams.get('comment_id') ?? 'initial';
  const commentReplyPage = searchParams.get('page_reply') ?? '1';
  const encodedIdArticle = encodeURIComponent(id!);

  const methodSubmitComment = useAddComment({
    artId: articleId,
    token: dataToken.token,
    user: state.user?.name ?? '',
    userId: state.user?.id ?? '',
  });

  const dataComments = useQuery<APIResPagination<Comment[]>>({
    queryKey: ['list-comments', articleId, commentsPage],
    queryFn: async () => {
      const response = await fetch(
        URLS.GET_COMMENTS(encodedIdArticle, commentsPage),
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        }
      );

      return await response.json();
    },
    enabled: Boolean(data.detailsArticle),
  });

  const dataReplies = useQuery<APIResPagination<Comment[]>>({
    queryKey: ['list-comment-replies', articleId, commentReplyPage, commentId],
    queryFn: async () => {
      const response = await fetch(
        URLS.GET_COMMENT_REPLIES(encodedIdArticle, commentId, commentReplyPage),
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        }
      );

      return await response.json();
    },
    enabled: Boolean(data.detailsArticle),
  });

  const methodSubmitLike = useUpdateLikes({
    onLikes: (data) => {
      if (!id) return;
      if (!stateComments[id]) return;

      const { commentId, likes } = data;

      const update = cloneDeep(stateComments[id]).map((topComment) => ({
        ...topComment,
        likes:
          commentId === topComment.id
            ? (parseInt(topComment.likes) + likes).toString()
            : topComment.likes,
        replies:
          commentId !== topComment.id
            ? updateNestedRepliesLikes(topComment, commentId, likes)
            : topComment.replies,
      }));

      setStateComments((prev) => ({ ...prev, [id]: update }));
    },
  });

  useFetchOnScroll({
    onChangeVisible: useCallback(
      (value) => {
        if (!dataComments.data) return;
        if (!dataReplies.data) return;
        if (!value) return;

        const currentPage = Number(searchParams.get('page')) || 1;
        if (dataComments.data.totalPages === currentPage) return;

        const nextPage = currentPage + 1;
        setSearchParams({ page: `${nextPage}` }, { replace: true });
      },
      [dataComments, dataReplies, setSearchParams, searchParams]
    ),
  });

  useLoadComments({
    dataComments: dataComments.data,
    dataCommentReplies: dataReplies.data,
    id,
    setStateComments,
  });

  if (!data.detailsArticle) {
    return (
      <NoDataMessage className="articles">
        <FontAwesomeIcon icon={faNewspaper} />
        <p>No article</p>
      </NoDataMessage>
    );
  }

  const article = data.detailsArticle.response.content;

  return (
    <section
      className="section section--details-article"
      key={
        context.activeTabs[1] ? context.activeTabs[1] : context.activeTabs[0]
      }
    >
      <ArticleDetails
        actionData={actionData}
        comments={id && stateComments[id] ? stateComments[id] : []}
        data={{
          id: article.id,
          sectionId: article.sectionId,
          title: article.webTitle,
          content: article.fields.body,
          trailText: article.fields.trailText,
          webPublicationDate: article.webPublicationDate,
          image: getDetailsArticleImageData(article.elements).image,
          altText: getDetailsArticleImageData(article.elements).altText,
          caption: getDetailsArticleImageData(article.elements).caption,
          credit: getDetailsArticleImageData(article.elements).credit,
        }}
        methodSubmitComment={methodSubmitComment}
        methodSubmitLike={methodSubmitLike}
        onShowReplies={(commentId) => {
          const currentParams = new URLSearchParams(searchParams);
          currentParams.set('comment_id', commentId);
          currentParams.set('page_reply', '1');
          setSearchParams(currentParams);
        }}
        onShowMoreReplies={(parentCommentId, page) => {
          const currentParams = new URLSearchParams(searchParams);
          currentParams.set('comment_id', parentCommentId);
          currentParams.set('page_reply', (page + 1).toString());
          setSearchParams(currentParams);
        }}
        successComments={!dataComments.isError}
        successRepliesComments={!dataReplies.isError}
        userData={state}
      />
    </section>
  );
};

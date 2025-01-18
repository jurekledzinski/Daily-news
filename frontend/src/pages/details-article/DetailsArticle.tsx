import { ActionData, UseOutletContext } from '../../types';
import { ArticleDetails } from '@components/pages';
import { cloneDeep } from 'lodash';
import { CommentsWithReplies, NoDataMessage } from '@components/shared';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loaderDetailsArticle } from '@api/index';
import { useCallback, useState } from 'react';
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

  const methodSubmitComment = useAddComment({
    artId: articleId,
    token: dataToken.token,
    user: state.user?.name ?? '',
    userId: state.user?.id ?? '',
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
        if (!data.comments || !data.comments.payload.result?.length) return;
        if (!data.commentReplies || !data.commentReplies.payload.result?.length)
          return;
        if (!value) return;

        const currentPage = Number(searchParams.get('page')) || 1;
        if (data.comments.totalPages === currentPage) return;

        console.log('fetch on scroll');

        const nextPage = currentPage + 1;
        setSearchParams({ page: `${nextPage}` }, { replace: true });
      },
      [data.comments, data.commentReplies, setSearchParams, searchParams]
    ),
  });

  useLoadComments({
    dataComments: data.comments,
    dataCommentReplies: data.commentReplies,
    id,
    setStateComments,
  });

  console.log('Details article component useLoaderData', data);
  console.log('Details article component actionData', actionData);

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
          setSearchParams({ comment_id: commentId, page_reply: '1' });
        }}
        onShowMoreReplies={(parentCommentId, page) => {
          const currentParams = new URLSearchParams(searchParams);
          currentParams.set('comment_id', parentCommentId);
          currentParams.set('page_reply', (page + 1).toString());
          setSearchParams(currentParams);
        }}
        successComments={data.comments ? data.comments.success : false}
        successRepliesComments={
          data.commentReplies ? data.commentReplies.success : false
        }
        userData={state}
      />
    </section>
  );
};

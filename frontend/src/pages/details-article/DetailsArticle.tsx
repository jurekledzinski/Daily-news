import { ActionData, UseOutletContext } from '../../types';
import { ArticleDetails } from '../../components/pages';
import { cloneDeep } from 'lodash';
import { CommentsWithReplies, NoDataMessage } from '../../components/shared';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loaderDetailsArticle } from '../../api';
import { useCallback, useState } from 'react';
import { useUserStore } from '../../store';
import './DetailsArticle.css';
import {
  getDetailsArticleImageData,
  updateNestedRepliesLikes,
} from '../../helpers';
import {
  useAddComment,
  useFetchOnScroll,
  useFetchProtection,
  useLoadComments,
  useUpdateLikes,
} from '../../hooks';
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
  const article = data.detailsArticle.response.content;
  const dataToken = useFetchProtection();
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
      if (!id || !stateComments[id]) return;
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
        if (!value) return;

        const currentPage = Number(searchParams.get('page')) || 1;
        if (data.comments.totalPages === currentPage) return;

        const nextPage = currentPage + 1;
        setSearchParams({ page: `${nextPage}` }, { replace: true });
      },
      [data.comments.totalPages, setSearchParams, searchParams]
    ),
  });

  useLoadComments({
    dataComments: data.comments,
    dataCommentReplies: data.commentReplies,
    id,
    setStateComments,
  });

  if (
    data.detailsArticle.response.status === 'error' &&
    'message' in data.detailsArticle.response
  ) {
    return (
      <NoDataMessage className="articles server-error">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p>
          {data.detailsArticle.response.message ??
            "Couldn't fetch data, please try later"}
        </p>
      </NoDataMessage>
    );
  }

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
        successComments={data.comments.success}
        successRepliesComments={data.commentReplies.success}
        userData={state}
      />
    </section>
  );
};

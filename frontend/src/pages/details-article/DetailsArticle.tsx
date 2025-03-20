import { ArticleDetails } from '@/components/pages';
import { DetailsArticleProps, StateComments } from './types';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NoDataMessage } from '@/components/shared';
import { useCallback, useState } from 'react';
import { UseOutletContext } from '../../types';
import { useOutletContext } from 'react-router-dom';
import { useUserStore } from '@/store';
import './DetailsArticle.css';

import { useFetchOnScroll } from '@/hooks';
import { useAddComment, useLoadComments, useUpdateLikes } from './hooks';
import { formatArticleData, updateStateLikes } from './helpers';

export const DetailsArticle = ({
  articleId,
  actionData,
  comments,
  commentsReplies,
  loaderData,
  token,
  onSetSearchParams,
  onShowReplies,
  onShowMoreReplies,
  searchParams,
}: DetailsArticleProps) => {
  const [stateComments, setStateComments] = useState<StateComments>({});
  const { state } = useUserStore();
  const context = useOutletContext<UseOutletContext>();

  const methodSubmitComment = useAddComment({
    artId: articleId,
    token: token,
    user: state.user?.name ?? '',
    userId: state.user?.id ?? '',
  });

  const methodSubmitLike = useUpdateLikes({
    onLikes: (data) => {
      if (!articleId) return;
      if (!stateComments[articleId]) return;
      const { commentId, likes } = data;
      const update = updateStateLikes(
        stateComments,
        articleId,
        commentId,
        likes
      );
      setStateComments((prev) => ({ ...prev, [articleId]: update }));
    },
  });

  useFetchOnScroll({
    onChangeVisible: useCallback(
      (value) => {
        if (!comments.data) return;
        if (!commentsReplies.data) return;
        if (!value) return;

        const currentPage = Number(searchParams.get('page')) || 1;
        if (comments.data.totalPages === currentPage) return;

        const nextPage = currentPage + 1;
        onSetSearchParams({ page: `${nextPage}` }, { replace: true });
      },
      [comments, commentsReplies, onSetSearchParams, searchParams]
    ),
  });

  useLoadComments({
    dataComments: comments.data,
    dataCommentReplies: commentsReplies.data,
    articleId,
    setStateComments,
  });

  if (!loaderData) {
    return (
      <NoDataMessage className="articles">
        <FontAwesomeIcon icon={faNewspaper} />
        <p>No article</p>
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
        comments={
          articleId && stateComments[articleId] ? stateComments[articleId] : []
        }
        data={{ ...formatArticleData(loaderData.response.content) }}
        methodSubmitComment={methodSubmitComment}
        methodSubmitLike={methodSubmitLike}
        onShowReplies={onShowReplies}
        onShowMoreReplies={onShowMoreReplies}
        successComments={!comments.isError}
        successRepliesComments={!commentsReplies.isError}
        userData={state}
      />
    </section>
  );
};

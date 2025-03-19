import { APIResPagination, Comment } from '@api/index';
import { CommentsWithReplies } from '@components/shared';
import { udpatedNestedReplies } from '@helpers/index';
import { uniqBy } from 'lodash';
import { useEffect } from 'react';

type UseLoadCommentsProps = {
  dataComments: APIResPagination<Comment[]> | undefined;
  dataCommentReplies: APIResPagination<Comment[]> | undefined;
  articleId: string | undefined;
  setStateComments: React.Dispatch<
    React.SetStateAction<Record<string, CommentsWithReplies[]>>
  >;
};

export const useLoadComments = ({
  dataComments,
  dataCommentReplies,
  articleId,
  setStateComments,
}: UseLoadCommentsProps) => {
  useEffect(() => {
    if (!articleId || !dataComments || !dataCommentReplies) return;
    const comments = dataComments.payload.result as CommentsWithReplies[];
    const replies = dataCommentReplies.payload.result as CommentsWithReplies[];
    const pageReply = dataCommentReplies.page;
    const totalReplyPages = dataCommentReplies.totalPages;
    const replyCount = dataCommentReplies.replyCount ?? 0;

    setStateComments((prev) => {
      return {
        ...prev,
        [articleId]: (prev[articleId]
          ? uniqBy([...prev[articleId], ...comments], 'id')
          : uniqBy([...comments], 'id')
        )
          .map((topComment) => {
            const current = comments.find((i) => i.id === topComment.id);
            const hasReply = replies.some(
              (reply) => reply.parentCommentId === topComment.id
            );

            if (hasReply) {
              return {
                ...topComment,
                page: dataComments.page,
                totalPages: dataComments.totalPages,
                replyCount: current?.replyCount ?? topComment.replyCount,
                pageReply: dataCommentReplies.page,
                totalReplyPages: dataCommentReplies.totalPages,
                replies: uniqBy(
                  [...(topComment.replies ?? []), ...replies].sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  ),
                  'id'
                ),
              };
            } else {
              const parentId = replies[0]?.parentCommentId ?? '';

              return {
                ...topComment,
                page: dataComments.page,
                totalPages: dataComments.totalPages,
                replyCount: current?.replyCount ?? topComment.replyCount,
                pageReply: dataCommentReplies.page,
                totalReplyPages: dataCommentReplies.totalPages,
                replies: uniqBy(
                  udpatedNestedReplies(
                    topComment,
                    parentId,
                    replies,
                    pageReply,
                    totalReplyPages,
                    replyCount
                  ).sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  ),
                  'id'
                ),
              };
            }
          })
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
      };
    });
  }, [dataComments, dataCommentReplies, articleId, setStateComments]);
};

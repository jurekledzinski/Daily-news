import { ArticleDetails } from '../../components/pages';
import { cloneDeep, uniqBy } from 'lodash';
import { CommentWithReplies } from '../../components/shared';
import { getDetailsArticleImageData } from '../../helpers';
import { loaderDetailsArticle } from '../../api';
import { useAddComment, useScrollToggle, useUpdateLikes } from '../../hooks';
import { useEffect, useRef, useState } from 'react';
import { UseOutletContext } from '../../types/global';
import { v4 as uuidv4 } from 'uuid';
import {
  Params,
  useLoaderData,
  useOutletContext,
  useParams,
} from 'react-router-dom';

type LoaderData = Awaited<ReturnType<ReturnType<typeof loaderDetailsArticle>>>;

export const DetailsArticle = () => {
  const articleHeaderRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<CommentWithReplies[]>([]);
  const { id } = useParams() as Params;
  const articleId = decodeURIComponent(id ?? '');

  const data = useLoaderData() as LoaderData;
  const article = data.detailsArticle.response.content;

  const context = useOutletContext<UseOutletContext>();

  const methodSubmit = useAddComment({
    artId: articleId,
    user: `user-${uuidv4().slice(0, 6)}`,
    userId: uuidv4(),
  });

  const methodSubmitLike = useUpdateLikes({
    onLikes: (data) => {
      const { commentId, likes } = data;

      const update = cloneDeep(state).map((topComment) => ({
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

      setState(update);
    },
  });

  useScrollToggle({
    onChangeVisible: (value) => {
      if (!context.headerRef.current) return;
      if (!context.tabsListContainerRef.current) return;

      if (value) {
        context.headerRef.current.classList.remove('slide');
        context.tabsListContainerRef.current.classList.remove('slide');
      } else {
        context.headerRef.current.classList.add('slide');
        context.tabsListContainerRef.current.classList.add('slide');
      }
    },
    target: articleHeaderRef,
    threshold: [0.5, 1.0],
  });

  console.log('DATA ---', data);

  useEffect(() => {
    const comments = data.comments.payload.result as CommentWithReplies[];
    const replies = data.commentReplies.payload.result as CommentWithReplies[];
    const pageReply = data.commentReplies.page;
    const totalReplyPages = data.commentReplies.totalPages;
    const replyCount = data.commentReplies.replyCount ?? 0;

    setState((prev) => {
      console.log('previos', prev);
      console.log('comments', comments);
      console.log('replies', replies);
      return uniqBy([...prev, ...comments], 'id')
        .map((topComment) => {
          const current = comments.find((i) => i.id === topComment.id);
          const hasReply = replies.some(
            (reply) => reply.parentCommentId === topComment.id
          );

          if (hasReply) {
            return {
              ...topComment,
              page: data.comments.page,
              totalPages: data.comments.totalPages,
              replyCount: current?.replyCount ?? topComment.replyCount,
              pageReply: data.commentReplies.page,
              totalReplyPages: data.commentReplies.totalPages,
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
              page: data.comments.page,
              totalPages: data.comments.totalPages,
              replyCount: current?.replyCount ?? topComment.replyCount,
              pageReply: data.commentReplies.page,
              totalReplyPages: data.commentReplies.totalPages,
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
        );
    });
  }, [data.comments, data.commentReplies]);

  console.log('state ----', state);

  return (
    <section className="section section--details-article">
      <ArticleDetails
        comments={state}
        headerRef={articleHeaderRef}
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
        methodSubmit={methodSubmit}
        methodSubmitLike={methodSubmitLike}
      />
    </section>
  );
};

function udpatedNestedReplies(
  comment: CommentWithReplies,
  commentId: string,
  newReplies: CommentWithReplies[],
  pageReply: number,
  totalReplyPages: number,
  replyCount: number
) {
  const temp: CommentWithReplies[] = [];

  const formatComment = {
    ...cloneDeep(comment),
    replies: comment.replies ? comment.replies : [],
  };

  for (const obj of formatComment.replies) {
    if (obj.id === commentId) {
      obj.replies = uniqBy(
        [...(obj?.replies ?? []), ...newReplies].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        'id'
      );
      obj.replyCount = replyCount;
      obj.pageReply = pageReply;
      obj.totalReplyPages = totalReplyPages;
      temp.push({ ...obj });
    } else {
      const updatedReplies = udpatedNestedReplies(
        obj,
        commentId,
        newReplies,
        pageReply,
        totalReplyPages,
        replyCount
      );
      temp.push({ ...obj, replies: updatedReplies });
    }
  }

  return temp;
}

function updateNestedRepliesLikes(
  comment: CommentWithReplies,
  commentId: string,
  likes: number
) {
  const temp: CommentWithReplies[] = [];

  const formatComment = {
    ...cloneDeep(comment),
    replies: comment.replies ? comment.replies : [],
  };

  for (const obj of formatComment.replies) {
    if (obj.id === commentId) {
      obj.likes += likes;
      temp.push({ ...obj });
    } else {
      const updatedReplies = updateNestedRepliesLikes(obj, commentId, likes);
      temp.push({ ...obj, replies: updatedReplies });
    }
  }

  return temp;
}

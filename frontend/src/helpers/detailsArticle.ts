import { ArticleDetailsElements } from '../api';
import { cloneDeep, uniqBy } from 'lodash';
import { CommentsWithReplies } from '../components/shared';

export const getDetailsArticleImageData = (
  elements: ArticleDetailsElements[]
) => {
  if (elements && elements.length) {
    const main = elements.sort((a, b) => a.relation.localeCompare(b.relation));

    const mainImage =
      main[0].assets && main[0].assets.length
        ? main[0].assets.sort(
            (a, b) =>
              parseFloat(b.typeData.width) - parseFloat(a.typeData.width)
          )[0]
        : '';

    return {
      image: mainImage ? mainImage.file : '',
      altText: mainImage ? mainImage.typeData.altText : '',
      credit: mainImage ? mainImage.typeData.credit : '',
      caption: mainImage ? mainImage.typeData.caption : '',
    };
  }

  return {
    image: '',
    altText: '',
    credit: '',
    caption: '',
  };
};

export const udpatedNestedReplies = (
  comment: CommentsWithReplies,
  commentId: string,
  newReplies: CommentsWithReplies[],
  pageReply: number,
  totalReplyPages: number,
  replyCount: number
) => {
  const temp: CommentsWithReplies[] = [];

  const formatComment = {
    ...cloneDeep(comment),
    replies: comment.replies ? comment.replies : [],
  };

  for (const obj of formatComment.replies) {
    if (obj.id === commentId) {
      obj.replies = uniqBy(
        [...newReplies, ...(obj?.replies ?? [])].sort(
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
};

export const updateNestedRepliesLikes = (
  comment: CommentsWithReplies,
  commentId: string,
  likes: number
) => {
  const temp: CommentsWithReplies[] = [];

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
};

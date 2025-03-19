import { ArticleDetails } from '@/api';
import {
  getDetailsArticleImageData,
  updateNestedRepliesLikes,
} from '@/helpers';
import { StateComments } from './types';
import { cloneDeep } from 'lodash';

export const formatArticleData = (article: ArticleDetails) => ({
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
});

export const updateStateLikes = (
  stateComments: StateComments,
  articleIdDecode: string,
  commentId: string,
  likes: number
) => {
  return cloneDeep(stateComments[articleIdDecode]).map((topComment) => ({
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
};

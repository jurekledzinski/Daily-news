import {
  getCategoriesArticles,
  getArticles,
  getDetailsArticle,
  getComments,
  getCommentReplies,
} from './apiCalls';

export const getCategoriesArticlesQuery = () => ({
  queryKey: ['list-categories'],
  queryFn: async () => getCategoriesArticles({}),
});

export const getArticlesQuery = (category: string, page: string) => ({
  queryKey: ['list-articles', category, page],
  queryFn: async () => getArticles({ category, page }),
});

export const getDetailsArticleQuery = (category: string, id: string) => ({
  queryKey: ['details-article', category, id],
  queryFn: async () => getDetailsArticle(id),
});

export const getCommentsQuery = (articleId: string, page: string) => ({
  queryKey: ['list-comments', articleId, page],
  queryFn: async () => getComments({ articleId, page }),
});

export const getCommentRepliesQuery = (
  articleId: string,
  commentId: string,
  page: string
) => {
  return {
    queryKey: ['list-comment-replies', articleId, page, commentId],
    queryFn: async () => getCommentReplies({ articleId, commentId, page }),
  };
};

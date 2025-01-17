import type { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

type GuardianResponse<T> = {
  results: T;
  status: string;
  total: number;
  userTier: string;
  content: T;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  message?: string;
};

export type APIGuardianResponseSuccess<T> = {
  response: Pick<
    GuardianResponse<T>,
    'results' | 'status' | 'total' | 'userTier'
  >;
};

export type APIGuardianResponsePagniationSuccess<T> = {
  response: Pick<
    GuardianResponse<T>,
    | 'results'
    | 'status'
    | 'total'
    | 'userTier'
    | 'startIndex'
    | 'pageSize'
    | 'currentPage'
    | 'pages'
    | 'message'
  >;
};

export type APIResponseDetailsSuccess<T> = {
  response: Pick<
    GuardianResponse<T>,
    'status' | 'total' | 'userTier' | 'content' | 'message'
  >;
};

export type APISuccess<T> = {
  success: boolean;
  payload: {
    result: T;
  };
  message?: string;
};

export interface APIResponsePagniationSuccess<T> extends APISuccess<T> {
  page: number;
  totalPages: number;
  replyCount?: number;
}

export interface APISuccessResponse<T = unknown>
  extends Omit<APISuccess<T>, 'payload'> {}

export type APIErrorResponse = {
  message?: string;
  success: boolean;
};

export type APICSRFTokenResponse = {
  token: string;
};

export type CSRFToken = {
  csrfToken: string;
};

export type ArticleDetailsElements = {
  id: string;
  relation: string;
  type: string;
  assets: {
    file: string;
    mimeType: string;
    type: string;
    typeData: Record<string, string>;
  }[];
};

export type ArticleDetails = {
  apiUrl: string;
  id: string;
  webTitle: string;
  elements: ArticleDetailsElements[];
  sectionId: string;
  fields: {
    headline: string;
    body: string;
    trailText: string;
  };
  webPublicationDate: string;
};

export interface CategoriesData
  extends Omit<ArticleDetails, 'elements' | 'fields' | 'webPublicationDate'> {
  editions: ArticleDetails[];
}

export type IDataCategories = {
  id: string;
  title: string;
  image: string;
};

export interface IArticles extends Omit<ArticleDetails, 'webPublicationDate'> {}

export type ArticleData = {
  id: string;
  content: string;
  image: string;
  sectionId: string;
  title: string;
  altText: string;
  credit: string;
  caption: string;
  trailText?: string;
  webPublicationDate?: string;
};

export interface IDetailsArticle extends ArticleDetails {}

export type Comment = {
  id: string;
  createdAt: string;
  idArticle: string;
  likes: string;
  parentCommentId: string | null;
  text: string;
  user: string;
  userId: string;
  replyCount?: number;
};

export type CommentCreate = Omit<Comment, 'id'> & CSRFToken;

export interface CommentAndReplies extends Comment {
  pageReply?: number;
  totalReplyPages?: number;
  replies: CommentAndReplies[];
}

export type Likes = {
  commentId: string;
  likes: number;
  parentCommentId?: string | null;
};

export type User = {
  email: string;
  name: string;
  password: string;
  id: string;
};

export type DataPassword = Pick<User, 'password'> & CSRFToken;
export type DataProfile = Omit<User, 'password' | 'id'> & CSRFToken;
export type DataLogin = Omit<User, 'name' | 'id'>;
export type DataUser = Omit<User, 'password'>;

type APIGuardian<T> = APIGuardianResponsePagniationSuccess<T>['response'];

interface ResponsePagination<T = IArticles[]> extends APIGuardian<T> {
  message: string;
}

export interface APIGuardianResponseError {
  response: ResponsePagination;
}

export type LoaderCategoriesFn = (
  queryClient: QueryClient
) => () => Promise<APIGuardianResponseSuccess<CategoriesData[]>>;

export type LoaderArticlesFn = (
  queryClient: QueryClient
) => ({
  params,
  request,
}: LoaderFunctionArgs) => Promise<
  APIGuardianResponsePagniationSuccess<IArticles[]> | APIGuardianResponseError
>;

export type LoaderDetailsArticleFn = (queryClient: QueryClient) => ({
  params,
  request,
}: LoaderFunctionArgs) => Promise<{
  detailsArticle: APIResponseDetailsSuccess<IDetailsArticle>;
  comments: APIResponsePagniationSuccess<Comment[]>;
  commentReplies: APIResponsePagniationSuccess<Comment[]>;
}>;

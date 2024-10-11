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
  >;
};

export type APIResponseDetailsSuccess<T> = {
  response: Pick<
    GuardianResponse<T>,
    'status' | 'total' | 'userTier' | 'content'
  >;
};

export type APIResponsePagniationSuccess<T> = {
  success: boolean;
  payload: {
    result: T;
  };
  page: number;
  totalPages: number;
  replyCount?: number;
};

export type APICreateResponseSuccess = {
  success: true;
};

export type APIUpdateResponseSuccess = {
  success: true;
};

export type IElements = {
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

export type IData = {
  apiUrl: string;
  id: string;
  webTitle: string;
  elements: IElements[];
  sectionId: string;
  fields: {
    headline: string;
    body: string;
    trailText: string;
  };
  webPublicationDate: string;
};

export interface ICategories
  extends Omit<IData, 'elements' | 'fields' | 'webPublicationDate'> {
  editions: IData[];
}

export type IDataCategories = {
  id: string;
  title: string;
};

export interface IArticles extends Omit<IData, 'webPublicationDate'> {}

export type IDataArticle = {
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

export interface IDetailsArticle extends IData {}

export type IComment = {
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

export type ICommentCreate = Omit<IComment, 'id'>;

export type ILikes = {
  commentId: string;
  likes: number;
  parentCommentId?: string | null;
};

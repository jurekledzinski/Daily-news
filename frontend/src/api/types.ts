export type APIResponseSuccess<T> = {
  response: {
    results: T;
    status: string;
    total: number;
    userTier: string;
  };
};

export type APIResponsePagniationSuccess<T> = {
  response: {
    results: T;
    status: string;
    total: number;
    userTier: string;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
  };
};

export type APIOwnResponsePagniationSuccess<T> = {
  success: boolean;
  payload: {
    result: T;
  };
};

export type APIResponseDetailsSuccess<T> = {
  response: {
    status: string;
    total: number;
    userTier: string;
    content: T;
  };
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
  likes: number;
  parentCommentId: string | null;
  text: string;
  user: string;
  userId: string;
};

export type ICommentCreate = Omit<IComment, 'id'>;

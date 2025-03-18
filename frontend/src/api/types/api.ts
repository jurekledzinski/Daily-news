type SuccessBase<T> = {
  success: boolean;
  payload: {
    result: T;
  };
  message?: string;
};

type PaginationBase = {
  page: number;
  totalPages: number;
  replyCount?: number;
};

export interface APIResPagination<T> extends SuccessBase<T>, PaginationBase {}

export type APIResSuccessPayload<T> = SuccessBase<T>;

export interface APIResSuccess extends Omit<SuccessBase<unknown>, 'payload'> {}

export interface ApiResError extends Omit<SuccessBase<unknown>, 'payload'> {}

export type APIResCSRFToken = {
  token: string;
};

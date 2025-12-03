export type APISuccessResponse<T = unknown> = {
  payload: T;
  success: boolean;
  message?: string;
};

export type APIErrorResponse = {
  success: boolean;
  message?: string;
};

export interface APIPaginationSuccessResponse<T> extends APISuccessResponse<T> {
  currentPage?: number;
  hasNextPage?: boolean;
}

export type APIGuardianSuccessResponse<T> = {
  response: T;
};

export type ActionData<T = unknown> = {
  action: string;
  message: string;
  payload?: T;
  success: boolean;
};

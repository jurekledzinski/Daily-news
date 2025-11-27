export type APISuccessResponse<T> = {
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
}

export type APIGuardianSuccessResponse<T> = {
  response: T;
};

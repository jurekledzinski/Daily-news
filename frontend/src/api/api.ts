export type APISuccessResponse<T> = {
  payload: T;
  success: boolean;
  message?: string;
};

export type APIErrorResponse = {
  success: boolean;
  message?: string;
};

export type APIGuardianSuccessResponse<T> = {
  response: T;
};

export type APIGuardianErrorResponse = {
  success: boolean;
  message?: string;
};

export const PAGE_SIZE = 4;

export const IP_ATTEMPTS_LIMIT = 50;
export const LOGIN_ATTEMPTS_LIMIT = 10;

export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_ERROR = 500,
}

export const STATUS_MESSAGE: Record<STATUS_CODE, string> = {
  [STATUS_CODE.OK]: 'OK',
  [STATUS_CODE.CREATED]: 'Created',
  [STATUS_CODE.BAD_REQUEST]: 'Bad Request',
  [STATUS_CODE.UNAUTHORIZED]: 'Unauthorized',
  [STATUS_CODE.FORBIDDEN]: 'Forbidden',
  [STATUS_CODE.NOT_FOUND]: 'Not Found',
  [STATUS_CODE.CONFLICT]: 'Conflict',
  [STATUS_CODE.TOO_MANY_REQUESTS]: 'Too Many Requests',
  [STATUS_CODE.INTERNAL_ERROR]: 'Internal Server Error',
};

export const SUCCESS_MESSAGE = {
  login: `Welcome back! You're logged in.`,
  register: `Your account is all set. Welcome aboard!`,
  updateProfile: `Your profile has been updated!`,
  updatePassword: `Your password has been changed safely`,
  deleteUser: `Your account has been removed.`,
  addComment: `Your comment has been posted!`,
};

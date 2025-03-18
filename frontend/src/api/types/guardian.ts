import { Articles } from './articles';

type GuardianBase = {
  status: string;
  total: number;
  userTier: string;
  message?: string;
};

type GuardianPagination = {
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
};

interface GuardianRes<T> extends GuardianBase {
  content: T;
  results: T;
}

export type APIGuardianResSuccess<T> = {
  response: Omit<GuardianRes<T>, 'content'>;
};

export type APIGuardianResPaginationSuccess<T> = {
  response: Omit<GuardianRes<T>, 'content'> & GuardianPagination;
};

export type APIGuardianResDetailsSuccess<T> = {
  response: Omit<GuardianRes<T>, 'results'>;
};

export type APIGuardian<T> = APIGuardianResPaginationSuccess<T>['response'];

export interface APIGuardianResError {
  response: APIGuardian<Articles[]> & { message: string };
}

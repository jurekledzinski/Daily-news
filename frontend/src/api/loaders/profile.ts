import { LoaderFunction } from 'react-router';
import { loaderTryCatch } from '@helpers';
import { loadToken } from './article';

export const loaderProfilePage: LoaderFunction = async () => {
  return await loaderTryCatch(loadToken());
};

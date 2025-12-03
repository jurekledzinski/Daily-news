import { APISuccessResponse } from '@api';
import type { Content } from '@guardian/content-api-models/v1/content';

export const tryCatch = <T, K, N = unknown>(fn: (body: N) => Promise<T>): ((body: N) => Promise<T | K>) => {
  return async (body: N): Promise<T | K> => {
    try {
      return await fn(body);
    } catch (error) {
      return error as K;
    }
  };
};

export const findTheBiggestImageInArticle = (data: APISuccessResponse<Content>) => {
  const elementsAssets = data.payload?.elements ?? [];
  const mainAssets = elementsAssets.find((item) => item.relation === 'main');

  if (mainAssets) {
    return mainAssets.assets.reduce((acc, curr) => {
      const sizeA = acc.typeData?.width;
      const sizeB = curr.typeData?.width;
      if (!sizeA || !sizeB) return curr;
      return Number(sizeB) > Number(sizeA) ? curr : acc;
    });
  }

  return undefined;
};

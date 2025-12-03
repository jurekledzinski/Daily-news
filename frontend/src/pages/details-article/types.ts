import type { Asset } from '@guardian/content-api-models/v1/asset';
import type { Content } from '@guardian/content-api-models/v1/content';

export type DetailsPageLoader = {
  article: { data: Content & { image: Asset }; success: boolean };
  token: { data: string; success: boolean };
};

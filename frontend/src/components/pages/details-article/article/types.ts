import type { Asset } from '@guardian/content-api-models/v1/asset';
import type { Content } from '@guardian/content-api-models/v1/content';

export type ArticleProps = {
  article: Content & { image: Asset };
};

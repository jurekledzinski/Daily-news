import { Asset } from '@guardian/content-api-models/v1/asset';
import { Content } from '@guardian/content-api-models/v1/content';

export type ArticleProps = {
  article: Content & { image: Asset };
};

import { Content } from '@guardian/content-api-models/v1/content';

export type CardArticleProps = {
  article: Content;
  onReadMore: (id: string) => void;
};

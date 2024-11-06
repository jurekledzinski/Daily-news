import { LocalData } from '../../dashboard';

export type CardProps = {
  article: LocalData['listArticles'][0];
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};

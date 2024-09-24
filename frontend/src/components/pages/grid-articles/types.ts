import { IDataArticle } from '../../../api';

export type CardProps = {
  article: IDataArticle;
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};

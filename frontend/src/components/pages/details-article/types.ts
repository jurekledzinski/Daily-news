import { LegacyRef } from 'react';
import { IComment, IDataArticle } from '../../../api';
import { CommentInput } from '../../shared';

export type ArticleDetailsProps = {
  comments: IComment[];
  data: IDataArticle;
  headerRef: LegacyRef<HTMLDivElement> | undefined;
  methodSubmit: (data: CommentInput, commentId?: string) => void;
};

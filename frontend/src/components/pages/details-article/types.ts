import { LegacyRef } from 'react';
import { IDataArticle } from '../../../api';

export type ArticleDetailsProps = {
  data: IDataArticle;
  headerRef: LegacyRef<HTMLDivElement> | undefined;
};

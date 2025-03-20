import { APIGuardianResPaginationSuccess, Articles } from '@/api';
import { LocalData } from '@/components/pages';

export type UseLoadGridArticlesProps = {
  category: string | undefined;
  data: APIGuardianResPaginationSuccess<Articles[]> | null;
  searchParams: URLSearchParams;
  onSetState: (articles: LocalData['listArticles']) => void;
};

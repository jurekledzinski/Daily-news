import { LocalData } from '@/components/pages';

export const checkIsExistArticle = (
  articles: LocalData['listArticles'],
  newArticles: LocalData['listArticles']
) => {
  const artilesIds = articles?.map((i) => i.id);
  const newaAtilesIds = newArticles?.map((i) => i.id);
  return newaAtilesIds?.some((i) => !artilesIds?.includes(i));
};

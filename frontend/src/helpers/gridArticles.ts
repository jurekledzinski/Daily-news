import { Articles, ArticleData } from '@/api';
import { uniqBy } from 'lodash';
import { getLocalData } from './global';

export const getFormatedData = (article: Articles) => {
  const transformedData = {
    content: article.fields.trailText,
    id: article.id,
    title: article.webTitle,
  };

  if (article.elements && article.elements.length) {
    const main = article.elements.sort((a, b) =>
      a.relation.localeCompare(b.relation)
    );

    const mainImage =
      main[0].assets && main[0].assets.length
        ? main[0].assets.sort(
            (a, b) =>
              parseFloat(b.typeData.width) - parseFloat(a.typeData.width)
          )[main[0].assets.length - 2]
        : '';

    return {
      ...transformedData,
      image: mainImage ? mainImage.file : '',
    };
  }

  return {
    ...transformedData,
    image: '',
  };
};

export function updateLocalData(
  category: string,
  formatedData: Pick<ArticleData, 'content' | 'id' | 'image' | 'title'>[],
  searchParams: URLSearchParams
) {
  const localData = getLocalData();

  return localData.map((itemCategory) => {
    return itemCategory.id === category
      ? {
          ...itemCategory,
          listArticles: uniqBy(
            [...itemCategory.listArticles, ...formatedData],
            'id'
          ),
          page: searchParams.get('page'),
        }
      : itemCategory;
  });
}

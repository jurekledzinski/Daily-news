import { IArticles } from '../api';

export const getFormatedData = (article: IArticles) => {
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

import { IElements } from '../api';

export function getDetailsArticleImageData(elements: IElements[]) {
  if (elements && elements.length) {
    const main = elements.sort((a, b) => a.relation.localeCompare(b.relation));

    const mainImage =
      main[0].assets && main[0].assets.length
        ? main[0].assets.sort(
            (a, b) =>
              parseFloat(b.typeData.width) - parseFloat(a.typeData.width)
          )[0]
        : '';

    return {
      image: mainImage ? mainImage.file : '',
      altText: mainImage ? mainImage.typeData.altText : '',
      credit: mainImage ? mainImage.typeData.credit : '',
      caption: mainImage ? mainImage.typeData.caption : '',
    };
  }

  return {
    image: '',
    altText: '',
    credit: '',
    caption: '',
  };
}

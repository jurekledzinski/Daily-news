import { Card } from '../../components/pages';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import './GridArticles.css';

import { loaderArticles } from '../../api';

type GridArticlesContext = {
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};

export const GridArticles = () => {
  //   const { category } = useParams();

  const { handleAddSubArticle } = useOutletContext<GridArticlesContext>();

  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderArticles>>
  >;

  return (
    <div className="grid-articles">
      {data.response.results
        .map((article) => {
          const transformedData = {
            content: article.fields.trailText,
            id: article.id,
            title: article.webTitle,
            sectionId: article.sectionId,
          };

          if (article.elements && article.elements.length) {
            const main = article.elements.sort((a, b) =>
              a.relation.localeCompare(b.relation)
            );

            const mainImage =
              main[0].assets && main[0].assets.length
                ? main[0].assets.sort(
                    (a, b) =>
                      parseFloat(b.typeData.width) -
                      parseFloat(a.typeData.width)
                  )[main[0].assets.length - 2]
                : '';

            return {
              ...transformedData,
              image: mainImage ? mainImage.file : '',
              altText: mainImage ? mainImage.typeData.altText : '',
              credit: mainImage ? mainImage.typeData.credit : '',
              caption: mainImage ? mainImage.typeData.caption : '',
            };
          }

          return {
            ...transformedData,
            image: '',
            altText: '',
            credit: '',
            caption: '',
          };
        })
        .map((article) => (
          <Card
            key={article.id}
            handleAddSubArticle={handleAddSubArticle}
            article={article}
          />
        ))}
    </div>
  );
};

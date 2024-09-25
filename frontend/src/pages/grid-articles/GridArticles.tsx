import { Card } from '../../components/pages';
import { IArticles, loaderArticles } from '../../api';
import { uniqBy } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetchOnScroll } from '../../hooks';
import { UseOutletContext } from '../../types/global';
import './GridArticles.css';
import {
  useLoaderData,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';

export const GridArticles = () => {
  const context = useOutletContext<UseOutletContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<IArticles[]>([]);
  const page = useRef<number>(1);

  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderArticles>>
  >;

  useFetchOnScroll({
    onChangeVisible: useCallback(
      (value) => {
        const currentPage = Number(searchParams.get('page'));
        if (data.response.pages === currentPage) return;

        page.current += 1;

        if (value) setSearchParams({ page: `${page.current}` });
      },
      [data.response.pages, searchParams, setSearchParams]
    ),
    target: context.footerRef,
    threshold: 0,
  });

  useEffect(() => {
    setState((prev) => uniqBy([...prev, ...data.response.results], 'id'));
  }, [data]);

  return (
    <div className="grid-articles">
      {state
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
            handleAddSubArticle={context.handleAddSubArticle}
            article={article}
          />
        ))}
    </div>
  );
};

// TODO: create function to return transformed data

function transformData(article: IArticles) {
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
              parseFloat(b.typeData.width) - parseFloat(a.typeData.width)
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
}

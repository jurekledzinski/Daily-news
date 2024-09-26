import { ArticleDetails } from '../../components/pages';
import { getDetailsArticleImageData } from '../../helpers';
import { loaderDetailsArticle } from '../../api';
import { useEffect } from 'react';
import { useFetchOnScroll } from '../../hooks';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { UseOutletContext } from '../../types/global';

export const DetailsArticle = () => {
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderDetailsArticle>>
  >;

  //   const context = useOutletContext<UseOutletContext>();

  //   console.log('a DetailsArticle', context);

  //   useFetchOnScroll({
  //     onChangeVisible: (value) => {
  //       console.log('value scroll details article', value);
  //     },
  //     target: context.footerRef,
  //     threshold: 0,
  //   });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="section section--details-article">
      <ArticleDetails
        data={{
          id: data.response.content.id,
          sectionId: data.response.content.sectionId,
          title: data.response.content.webTitle,
          content: data.response.content.fields.body,
          trailText: data.response.content.fields.trailText,
          webPublicationDate: data.response.content.webPublicationDate,
          image: getDetailsArticleImageData(data.response.content.elements)
            .image,
          altText: getDetailsArticleImageData(data.response.content.elements)
            .altText,
          caption: getDetailsArticleImageData(data.response.content.elements)
            .caption,
          credit: getDetailsArticleImageData(data.response.content.elements)
            .credit,
        }}
      />
    </section>
  );
};

import { ArticleDetails } from '../../components/pages';
import { getDetailsArticleImageData } from '../../helpers';
import { loaderDetailsArticle } from '../../api';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { UseOutletContext } from '../../types/global';
import { useRef } from 'react';
import { useScrollToggle } from '../../hooks';

export const DetailsArticle = () => {
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderDetailsArticle>>
  >;
  const articleHeaderRef = useRef<HTMLDivElement | null>(null);
  const context = useOutletContext<UseOutletContext>();

  useScrollToggle({
    onChangeVisible: (value) => {
      if (!context.headerRef.current) return;
      if (!context.tabsListContainerRef.current) return;

      if (value) {
        context.headerRef.current.classList.remove('slide');
        context.tabsListContainerRef.current.classList.remove('slide');
      } else {
        context.headerRef.current.classList.add('slide');
        context.tabsListContainerRef.current.classList.add('slide');
      }
    },
    target: articleHeaderRef,
    threshold: [0.5, 1.0],
  });

  return (
    <section className="section section--details-article">
      <ArticleDetails
        headerRef={articleHeaderRef}
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

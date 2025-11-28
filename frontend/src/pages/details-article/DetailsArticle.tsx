import { Asset } from '@guardian/content-api-models/v1/asset';
import { Container, Heading, ImageWithLoader } from '@components/shared';
import { formatDateLocalString, optionsFormatDate1 } from '@helpers';
import { htmlToText } from 'html-to-text';
import { useLoaderData } from 'react-router';
import './DetailsArticle.css';
import type { Content } from '@guardian/content-api-models/v1/content';

export const DetailsArticle = () => {
  const article = useLoaderData<{ data: Content & { image: Asset } }>();

  const data = formatDateLocalString({
    date: article.data.webPublicationDate ? String(article.data.webPublicationDate) : new Date(),
    options: optionsFormatDate1,
  });

  return (
    <Container className="container-details">
      <Heading className="headling mt-md" level={4}>
        {article.data.webTitle}
      </Heading>

      <i>{htmlToText(article.data.fields?.trailText ?? '')}</i>

      <span className="datePublish">Publish date: {data}</span>

      {article.data.image.file && (
        <div className="container-image">
          <ImageWithLoader src={article.data.image.file} />

          {article.data.image.typeData?.photographer && (
            <span className="caption">{article.data.image.typeData?.credit}</span>
          )}
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: article.data.fields?.body ?? '' }}></div>
    </Container>
  );
};

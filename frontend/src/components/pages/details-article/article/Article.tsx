import { ArticleProps } from './types';
import { formatDateLocalString, optionsFormatDate1 } from '@helpers';
import { Heading, ImageWithLoader } from '@components/shared';
import { htmlToText } from 'html-to-text';
import './Article.css';

export const Article = ({ article }: ArticleProps) => {
  const data = formatDateLocalString({
    date: article.webPublicationDate ? String(article.webPublicationDate) : new Date(),
    options: optionsFormatDate1,
  });

  return (
    <>
      <Heading className="headling mt-md" level={4}>
        {article.webTitle}
      </Heading>

      <i>{htmlToText(article.fields?.trailText ?? '')}</i>

      <span className="datePublish">Publish date: {data}</span>

      {article.image.file && (
        <div className="container-image">
          <ImageWithLoader src={article.image.file} />

          {article.image.typeData?.photographer && (
            <span className="caption">{article.image.typeData?.credit}</span>
          )}
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: article.fields?.body ?? '' }}></div>
    </>
  );
};

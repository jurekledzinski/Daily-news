import DOMPurify from 'dompurify';
import { ArticleDetailsProps } from './types';
import './ArticleDetails.css';

export const ArticleDetails = ({ data }: ArticleDetailsProps) => {
  const cleanCaption = DOMPurify.sanitize(data.caption);
  const cleanContent = DOMPurify.sanitize(data.content);

  return (
    <div className="details-article">
      <header className="details-article__header">
        <h1 className="details-article__title">{data.title}</h1>
        <p className="details-article__trail">{data.trailText}</p>
      </header>

      {data.image ? (
        <figure className="details-article__figure">
          <div className="details-article__image">
            <img src={data.image} alt={data.altText} />
            <span>{data.credit}</span>
          </div>
          <figcaption
            dangerouslySetInnerHTML={{ __html: cleanCaption }}
          ></figcaption>
        </figure>
      ) : null}

      <div
        className="details-article__body"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      ></div>

      <div className="details-article__footer">
        <p>Published on: {data.webPublicationDate}</p>
      </div>
    </div>
  );
};

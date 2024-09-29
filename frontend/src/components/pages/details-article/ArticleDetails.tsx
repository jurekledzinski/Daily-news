import { ArticleDetailsProps } from './types';
import { Header } from './Header';
import { sanitizeContent } from '../../../helpers';
import './ArticleDetails.css';

export const ArticleDetails = ({ data, headerRef }: ArticleDetailsProps) => {
  const cleanCaption = sanitizeContent(data.caption);
  const cleanContent = sanitizeContent(data.content);

  return (
    <div className="details-article">
      <Header
        ref={headerRef}
        title={data.title}
        trailText={data.trailText ?? ''}
      />

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

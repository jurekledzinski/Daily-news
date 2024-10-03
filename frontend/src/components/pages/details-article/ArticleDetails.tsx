import { ArticleDetailsProps } from './types';
import { Header } from './Header';
import { sanitizeContent } from '../../../helpers';
import './ArticleDetails.css';
import { SectionComments, Form } from '../../shared';
import { comments } from '../../../dummy-api/comments';

export const ArticleDetails = ({
  data,
  headerRef,
  onSubmit,
  onReply,
  onLikes,
}: ArticleDetailsProps) => {
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
        {data.webPublicationDate ? (
          <p>
            Published on: {new Date(data.webPublicationDate).toLocaleString()}
          </p>
        ) : null}
      </div>
      <Form buttonText="Add comment" onSubmit={onSubmit} />
      <SectionComments
        comments={[...comments]}
        onLikes={() => {}}
        onReply={() => {}}
      />
    </div>
  );
};

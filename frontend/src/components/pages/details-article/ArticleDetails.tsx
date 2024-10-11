import { ArticleDetailsProps } from './types';
import { Form, SectionComments } from '../../shared';
import { Header } from './Header';
import { sanitizeContent } from '../../../helpers';
import { useSearchParams } from 'react-router-dom';
import './ArticleDetails.css';

export const ArticleDetails = ({
  comments,
  data,
  headerRef,
  methodSubmit,
  methodSubmitLike,
}: ArticleDetailsProps) => {
  const cleanCaption = sanitizeContent(data.caption);
  const cleanContent = sanitizeContent(data.content);
  const [searchParams, setSearchParams] = useSearchParams();

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

      <Form buttonText="Add comment" onSubmit={(data) => methodSubmit(data)} />

      <SectionComments
        comments={comments}
        onShowReplies={async (commentId) => {
          console.log('commentId show replies', commentId);
          setSearchParams({ comment_id: commentId, page_reply: '1' });
        }}
        onShowMoreReplies={(parentCommentId, page) => {
          console.log('click more replies', parentCommentId, page);
          const currentParams = new URLSearchParams(searchParams);
          currentParams.set('comment_id', parentCommentId);
          currentParams.set('page_reply', (page + 1).toString());
          setSearchParams(currentParams);
        }}
        onShowPreviousReplies={(parentCommentId, pageReply) => {
          const currentParams = new URLSearchParams(searchParams);
          currentParams.set('comment_id', parentCommentId);
          currentParams.set('page_reply', (pageReply - 1).toString());
          setSearchParams(currentParams);
        }}
        onSubmitLike={methodSubmitLike}
      >
        {(commentId) => {
          return (
            <Form
              buttonText="Reply to comment"
              onSubmit={(data) => methodSubmit(data, commentId)}
            />
          );
        }}
      </SectionComments>
    </div>
  );
};

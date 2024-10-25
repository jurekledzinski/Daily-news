import { ArticleDetailsProps } from './types';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlertError, FormComment, SectionComments } from '../../shared';
import { Header } from './Header';
import { sanitizeContent } from '../../../helpers';
import './ArticleDetails.css';
import { useActionData } from 'react-router-dom';
import { ActionData } from '../../../types';

export const ArticleDetails = ({
  comments,
  data,
  headerRef,
  methodSubmitComment,
  methodSubmitLike,
  onShowReplies,
  onShowMoreReplies,
  userData,
}: ArticleDetailsProps) => {
  const actionData = useActionData() as ActionData;
  const cleanCaption = sanitizeContent(data.caption);
  const cleanContent = sanitizeContent(data.content);

  //   TODO: create message info komponent w messages folder i zmien niżej

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

      {userData.user ? (
        <FormComment
          buttonText="Add comment"
          onSubmit={(data) => methodSubmitComment(data)}
        />
      ) : (
        <div
          className="message-info"
          style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <FontAwesomeIcon icon={faLock} />
          <p>Sign in to add comment</p>
        </div>
      )}

      {actionData && actionData.action === 'create-comment' && (
        <AlertError className="alert-error--article-details">
          {actionData.message}
        </AlertError>
      )}

      <SectionComments
        comments={comments}
        onShowReplies={onShowReplies}
        onShowMoreReplies={onShowMoreReplies}
        onSubmitLike={methodSubmitLike}
      >
        {userData.user
          ? (commentId, onClose) => {
              return (
                <>
                  <FormComment
                    buttonText="Reply to comment"
                    onSubmit={(data) => {
                      onClose();
                      methodSubmitComment(data, commentId);
                    }}
                  />
                  {actionData && actionData.action === 'create-reply' && (
                    <AlertError className="alert-error--article-details">
                      {actionData.message}
                    </AlertError>
                  )}
                </>
              );
            }
          : null}
      </SectionComments>
    </div>
  );
};

import { ArticleDetailsProps } from './types';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '@components/pages/details-article';
import { InfoMessage } from '@components/shared';
import { sanitizeContent } from '@helpers/index';
import './ArticleDetails.css';
import {
  AlertError,
  FormComment,
  Image,
  SectionComments,
} from '@components/shared';

export const ArticleDetails = ({
  actionData,
  comments,
  data,
  methodSubmitComment,
  methodSubmitLike,
  onShowReplies,
  onShowMoreReplies,
  successComments,
  successRepliesComments,
  userData,
}: ArticleDetailsProps) => {
  const cleanCaption = sanitizeContent(data.caption);
  const cleanContent = sanitizeContent(data.content);

  return (
    <div className="details-article">
      <Header title={data.title} trailText={data.trailText ?? ''} />

      {data.image ? (
        <figure className="details-article__figure">
          <div className="details-article__image">
            <Image className="image" altText="image" src={data.image} />
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
            Published on: {new Date(data.webPublicationDate).toDateString()}
          </p>
        ) : null}
      </div>

      {userData.user ? (
        <FormComment
          buttonText="Add comment"
          onSubmit={(data) => methodSubmitComment(data)}
        />
      ) : (
        <InfoMessage className="info-message--article">
          <FontAwesomeIcon icon={faLock} />
          <p>Sign in to add comment</p>
        </InfoMessage>
      )}

      {actionData && actionData.action === 'create-comment' && (
        <AlertError className="alert-error--article-details">
          {actionData.message}
        </AlertError>
      )}

      {actionData && actionData.action === 'create-reply' && (
        <AlertError className="alert-error--article-details">
          {actionData.message}
        </AlertError>
      )}

      {!successComments || !successRepliesComments ? (
        <AlertError className="alert-error--article-details">
          Couldn't load comments
        </AlertError>
      ) : (
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
                        methodSubmitComment(data, commentId);
                        onClose();
                      }}
                    />
                  </>
                );
              }
            : null}
        </SectionComments>
      )}
    </div>
  );
};

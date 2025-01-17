import { AlertError, FormComment, SectionComments } from '@components/shared';
import { ArticleDetailsProps } from './types';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '@components/pages/details-article';
import { InfoMessage } from '@components/shared';
import { sanitizeContent } from '@helpers/index';
import './ArticleDetails.css';

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

  console.log('details action data', actionData);
  console.log('details userData', userData);
  console.log('details comments', comments);
  console.log('details data', data);
  console.log('details successComments', successComments);
  console.log('details successRepliesComments', successRepliesComments);

  return (
    <div className="details-article">
      <Header title={data.title} trailText={data.trailText ?? ''} />

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

      {/* {!successComments || !successRepliesComments ? (
        <AlertError className="alert-error--article-details">
          Couldn't fetch data comments
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
      )} */}
    </div>
  );
};

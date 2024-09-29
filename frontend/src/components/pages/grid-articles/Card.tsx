import { CardProps } from './types';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from '../../shared';
import { Link } from 'react-router-dom';
import { sanitizeContent } from '../../../helpers';
import './Card.css';
import { forwardRef, Ref } from 'react';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ article, handleAddSubArticle }, ref: Ref<HTMLDivElement>) => {
    const { content, id, image, title } = article;
    const cleanContent = sanitizeContent(content);

    return (
      <div className="card" ref={ref}>
        <div className="card__header">
          <Link
            to={`article/${encodeURIComponent(id)}`}
            onClick={(e) => {
              handleAddSubArticle({ id, title, scroll: e.pageY });
            }}
          >
            {image ? (
              <Image className="image" altText={title} src={image} />
            ) : (
              <FontAwesomeIcon icon={faImage} />
            )}
          </Link>
        </div>
        <div className="card__body">
          <h6 className="card__title">{title}</h6>
          <p
            className="card__content"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          ></p>
        </div>
      </div>
    );
  }
);

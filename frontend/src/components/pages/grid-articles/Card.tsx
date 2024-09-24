import DOMPurify from 'dompurify';
import { CardProps } from './types';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Loader } from '../../shared';
import { useState } from 'react';
import './Card.css';

export const Card = ({ article, handleAddSubArticle }: CardProps) => {
  const { content, id, image, title } = article;
  const cleanContent = DOMPurify.sanitize(content);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="card">
      <div className="card__header">
        <Link
          to={`article/${encodeURIComponent(id)}`}
          onClick={() => {
            handleAddSubArticle && handleAddSubArticle({ id, title });
          }}
        >
          {image && loading && !error && <Loader />}
          {image && !error ? (
            <img
              alt={title}
              className="card__img"
              src={image}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
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
};

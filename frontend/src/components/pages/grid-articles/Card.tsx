import { Link } from 'react-router-dom';
import './Card.css';

type CardProps = {
  article: {
    content: string;
    id: string;
    image: string;
    title: string;
  };
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};

export const Card = ({ article, handleAddSubArticle }: CardProps) => {
  const { content, id, image, title } = article;

  return (
    <div className="card">
      <div
        className="card__header"
        style={{
          backgroundImage: image
            ? `url(${image})`
            : `url(https://cdn.pixabay.com/photo/2018/06/12/19/59/football-3471371_1280.jpg)`,
        }}
      >
        <Link
          to={`article/${id}`}
          onClick={() => {
            handleAddSubArticle({ id, title });
          }}
        ></Link>
      </div>
      <div className="card__body">
        <h6 className="card__title">{title}</h6>
        <p className="card__content">{content}</p>
      </div>
    </div>
  );
};

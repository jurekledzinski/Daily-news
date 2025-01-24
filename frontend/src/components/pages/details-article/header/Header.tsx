import { ArticleHeaderProps } from './types';
import '../article-details/ArticleDetails.css';

export const Header = ({ title, trailText }: ArticleHeaderProps) => {
  return (
    <header className="details-article__header">
      <h2 className="details-article__title">{title}</h2>
      <p className="details-article__trail">{trailText}</p>
    </header>
  );
};

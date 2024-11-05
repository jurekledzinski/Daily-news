import { ArticleHeaderProps } from './types';
import '../article-details';

export const Header = ({ title, trailText }: ArticleHeaderProps) => {
  return (
    <header className="details-article__header">
      <h4 className="details-article__title">{title}</h4>
      <p className="details-article__trail">{trailText}</p>
    </header>
  );
};

import { forwardRef, Ref } from 'react';

type ArticleHeaderProps = {
  title: string;
  trailText: string;
};

export const Header = forwardRef<HTMLDivElement, ArticleHeaderProps>(
  ({ title, trailText }, ref: Ref<HTMLDivElement>) => {
    return (
      <header className="details-article__header" ref={ref}>
        <h1 className="details-article__title">{title}</h1>
        <p className="details-article__trail">{trailText}</p>
      </header>
    );
  }
);

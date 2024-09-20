import { Link, useParams, useOutletContext } from 'react-router-dom';

import './GridArticles.css';

type GridArticlesContext = {
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};

export const GridArticles = () => {
  const { category } = useParams();
  const { handleAddSubArticle } = useOutletContext<GridArticlesContext>();
  console.log('GRID', category);

  return (
    <div className="grid-articles">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="card">
          <div
            key={index}
            className="card__header"
            style={{
              backgroundImage: `url(https://cdn.pixabay.com/photo/2018/06/12/19/59/football-3471371_1280.jpg)`,
            }}
          >
            <Link
              to={`article/${index}`}
              onClick={() => {
                handleAddSubArticle({ id: `${index}`, title: `${index}` });
              }}
            ></Link>
          </div>
          <div className="card__body">
            <h6 className="card__title">Football is going down</h6>
            <p className="card__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              cumque aliquam? Suscipit temporibus voluptates, quo sint,
              molestias alias facere ipsum quisquam cupiditate, fugiat quasi
              dolores assumenda earum culpa pariatur laudantium? dsfdsfsfsfd
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

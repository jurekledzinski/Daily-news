import { Card } from '../../components/pages';
import { useOutletContext, useParams } from 'react-router-dom';
import './GridArticles.css';

type GridArticlesContext = {
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};

const article = {
  id: 'id',
  title: 'title',
  content: 'content',
  image:
    'https://cdn.pixabay.com/photo/2018/06/12/19/59/football-3471371_1280.jpg',
};

export const GridArticles = () => {
  const { category } = useParams();
  const { handleAddSubArticle } = useOutletContext<GridArticlesContext>();
  console.log('GRID', category);

  return (
    <div className="grid-articles">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card
          key={index}
          handleAddSubArticle={handleAddSubArticle}
          article={article}
        />
      ))}
    </div>
  );
};

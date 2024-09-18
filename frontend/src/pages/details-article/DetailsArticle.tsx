import { useParams } from 'react-router-dom';

export const DetailsArticle = () => {
  const { category, id } = useParams();
  return (
    <section className="section">
      Details article {category} {id}
    </section>
  );
};

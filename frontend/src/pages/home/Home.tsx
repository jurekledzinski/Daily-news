import { Header } from '../../components/pages';
import { loaderCategories } from '../../api';
import { Outlet, useLoaderData } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderCategories>>
  >;

  return (
    <div className="container">
      <Header />
      <Outlet
        context={{
          categories: (data.response.results ?? []).map((c) => ({
            id: c.id,
            title: c.webTitle,
          })),
        }}
      />
      <footer className="footer">
        All rights reserved © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

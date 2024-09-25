import { Header } from '../../components/pages';
import { loaderCategories } from '../../api';
import { Outlet, useLoaderData } from 'react-router-dom';
import './Home.css';
import { useRef } from 'react';

export const Home = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
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
          header: headerRef,
          footerRef: footerRef,
        }}
      />
      <footer className="footer" ref={footerRef}>
        All rights reserved © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

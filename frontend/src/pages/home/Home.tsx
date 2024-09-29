import { Header } from '../../components/pages';
import { loaderCategories } from '../../api';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useRef } from 'react';
import './Home.css';

export const Home = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderCategories>>
  >;

  return (
    <div className="container">
      <Header ref={headerRef} />
      <Outlet
        context={{
          categories: (data.response.results ?? []).map((c) => ({
            id: c.id,
            title: c.webTitle,
          })),
          headerRef: headerRef,
          footerRef: footerRef,
        }}
      />
      <footer className="footer" ref={footerRef}>
        All rights reserved © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

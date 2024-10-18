import { Header } from '../../components/pages';
import { loaderCategories } from '../../api';
import {
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useMatch,
} from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useRef } from 'react';
import './Home.css';

export const Home = () => {
  const match = useMatch('/');
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderCategories>>
  >;

  useEffect(() => {
    if (!headerRef.current) return;
    if (!match) {
      headerRef.current.style.position = 'fixed';
    } else {
      headerRef.current.style.position = 'static';
    }
  }, [match]);

  return (
    <div className="container">
      <Header ref={headerRef} />
      <Suspense>
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
      </Suspense>

      <ScrollRestoration
        storageKey="myAppScroll"
        getKey={(location) => {
          return location.pathname;
        }}
      />

      <footer className="footer" ref={footerRef}>
        All rights reserved © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

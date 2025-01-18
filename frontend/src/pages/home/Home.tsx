import { Footer, Header } from '@components/pages';
import { loaderCategories } from '@api/index';
import { Suspense } from 'react';
import './Home.css';

import {
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useMatch,
} from 'react-router-dom';

export const Home = () => {
  const matchHome = useMatch('/');
  const matchProfile = useMatch('/profile/:id');

  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderCategories>>
  >;

  console.log('Data ', data);

  return (
    <div className="container">
      <Header matchHome={matchHome} matchProfile={matchProfile} />
      <Suspense>
        <Outlet
          context={{
            categories: (data ? data.response.results : [])
              .map((c) => ({
                id: c.id,
                title: c.webTitle,
              }))
              .sort((a, b) => a.id.localeCompare(b.id)),
          }}
        />
      </Suspense>

      <ScrollRestoration
        storageKey="myAppScroll"
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <Footer>All rights reserved © {new Date().getFullYear()}</Footer>
    </div>
  );
};

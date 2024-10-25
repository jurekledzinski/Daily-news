import { Footer, Header } from '../../components/pages';
import { getCurrentCategory } from '../../helpers';
import { loaderCategories } from '../../api';
import { Suspense } from 'react';
import './Home.css';

import {
  Outlet,
  Params,
  ScrollRestoration,
  useLoaderData,
  useMatch,
  useParams,
} from 'react-router-dom';

export const Home = () => {
  const { category } = useParams() as Params;
  const matchHome = useMatch('/');
  const matchProfile = useMatch('/profile/:id');

  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loaderCategories>>
  >;

  return (
    <div className="container">
      <Header matchHome={matchHome} matchProfile={matchProfile} />
      <Suspense>
        <Outlet
          context={{
            categories: (data.response?.results ?? []).map((c) => ({
              id: c.id,
              title: c.webTitle,
            })),
          }}
        />
      </Suspense>

      <ScrollRestoration
        storageKey="myAppScroll"
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <Footer
        category={category}
        isSubTabs={Boolean(getCurrentCategory(category ?? '')?.articles.length)}
        matchHome={matchHome}
        matchProfile={matchProfile}
      >
        All rights reserved © {new Date().getFullYear()}
      </Footer>
    </div>
  );
};

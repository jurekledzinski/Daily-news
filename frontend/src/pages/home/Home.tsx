import styles from './Home.module.css';
import { Footer, Header } from '@components/pages';
import { Outlet, ScrollRestoration } from 'react-router';
import { Suspense } from 'react';
import { useFetchUserData } from '@hooks';

export const Home = () => {
  useFetchUserData();

  return (
    <div className={styles.container}>
      <Header />
      <Suspense>
        <Outlet />
        <ScrollRestoration />
      </Suspense>
      <Footer>All rights reserved © {new Date().getFullYear()}</Footer>
    </div>
  );
};

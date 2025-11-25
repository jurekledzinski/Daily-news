import styles from './Home.module.css';
import { Footer, Header } from '@components/pages';
import { Outlet } from 'react-router';
import { Suspense } from 'react';

export const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer>All rights reserved © {new Date().getFullYear()}</Footer>
    </div>
  );
};

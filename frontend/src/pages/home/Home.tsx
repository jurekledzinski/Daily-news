import styles from './Home.module.css';
import { Footer, Header } from '@components/pages';
import { Outlet } from 'react-router';
import { Suspense, useEffect } from 'react';
import { useFetchUserData } from '@hooks';

const preloadedHrefs = [
  '/images/artanddesign.webp',
  '/images/australia-news.webp',
  '/images/cities.webp',
  '/images/empty-image.webp',
  '/images/environment.webp',
  '/images/fashion.webp',
  '/images/film.webp',
  '/images/food.webp',
  '/images/football.webp',
  '/images/games.webp',
  '/images/music.webp',
  '/images/news.webp',
  '/images/politics.webp',
  '/images/science.webp',
  '/images/sport.webp',
  '/images/technology.webp',
  '/images/travel.webp',
  '/images/uk-news.webp',
  '/images/us-news.webp',
  '/images/weather.webp',
  '/images/world.webp',
  '/icons/artanddesign.webp',
  '/icons/australia-news.webp',
  '/icons/cities.webp',
  '/icons/environment.webp',
  '/icons/fashion.webp',
  '/icons/film.webp',
  '/icons/food.webp',
  '/icons/football.webp',
  '/icons/games.webp',
  '/icons/music.webp',
  '/icons/news.webp',
  '/icons/politics.webp',
  '/icons/science.webp',
  '/icons/sport.webp',
  '/icons/technology.webp',
  '/icons/travel.webp',
  '/icons/uk-news.webp',
  '/icons/us-news.webp',
  '/icons/weather.webp',
  '/icons/world.webp',
  '/src/assets/fonts/oswald-regular.woff2',
  '/src/assets/fonts/oswald-700.woff2',
];

export const Home = () => {
  useFetchUserData();

  useEffect(() => {
    const links = preloadedHrefs.map((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach((link) => document.head.removeChild(link));
    };
  }, []);

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

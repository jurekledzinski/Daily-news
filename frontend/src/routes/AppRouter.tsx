import CategoriesArticles from '../pages/categories-articles';
import Dashboard from '../pages/dashboard';
import DetailsArticle from '../pages/details-article';
import GridArticles from '../pages/grid-articles';
import Home from '../pages/home';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../components/pages';
import { QueryClient } from '@tanstack/react-query';
import {
  actionDetailsArticle,
  loaderArticles,
  loaderCategories,
  loaderDetailsArticle,
} from '../api';

// TODO:

// Get this queryClient and invalidate queries comments when change tabs and close tabs

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: loaderCategories(queryClient),
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <div>Error page dashboard index</div>,
      },
      {
        path: 'categories/:category/articles',
        element: <CategoriesArticles />,
        errorElement: <div>Error page categories</div>,
        children: [
          {
            index: true,
            element: <GridArticles />,
            errorElement: <div>Error grid list articles</div>,
            loader: loaderArticles(queryClient),
          },
          {
            path: 'article/:id',
            element: <DetailsArticle />,
            errorElement: <div>Error page details article</div>,
            loader: loaderDetailsArticle(queryClient),
            action: actionDetailsArticle(queryClient),
          },
        ],
      },
    ],
  },
]);

export default router;

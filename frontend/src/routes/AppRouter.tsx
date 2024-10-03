import CategoriesArticles from '../pages/categories-articles';
import Dashboard from '../pages/dashboard';
import DetailsArticle from '../pages/details-article';
import GridArticles from '../pages/grid-articles';
import Home from '../pages/home';
import { createBrowserRouter } from 'react-router-dom';
import {
  actionCreateComment,
  loaderArticles,
  loaderCategories,
  loaderDetailsArticle,
} from '../api';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>Error home page</div>,
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
            action: actionCreateComment,
          },
        ],
      },
    ],
  },
]);

export default router;

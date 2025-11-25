import CategoriesArticles from '@/pages/categories-articles';
import Dashboard from '@/pages/dashboard';
import DetailsArticle from '@/pages/details-article';
import GridArticles from '@/pages/grid-articles';
import Home from '@/pages/home';
import Profile from '@/pages/profile';
import { createBrowserRouter } from 'react-router';
import { ErrorPage } from '@components/pages';
import { ProtectedRoute } from '@components/shared';
import { QueryClient } from '@tanstack/react-query';
import {
  actionDetailsArticle,
  actionHome,
  actionProfileUser,
  loaderArticleDetailsPage,
  loaderArticlesListPage,
  loaderHomePage,
} from '@api';

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    action: actionHome,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        loader: loaderHomePage,
      },
      {
        path: 'categories/:category/articles',
        element: <CategoriesArticles />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <GridArticles />,
            errorElement: <ErrorPage />,
            loader: loaderArticlesListPage,
          },
          {
            path: 'article/:id',
            element: <DetailsArticle />,
            errorElement: <ErrorPage />,
            loader: loaderArticleDetailsPage,
            action: actionDetailsArticle,
          },
        ],
      },
      {
        path: 'profile/:id',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        action: actionProfileUser,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;

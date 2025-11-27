import CategoriesArticles from '@/pages/categories-articles';
import Dashboard from '@/pages/dashboard';
import DetailsArticle from '@/pages/details-article';
import GridArticles from '@/pages/grid-articles';
import Home from '@/pages/home';
import Profile from '@/pages/profile';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { createBrowserRouter } from 'react-router';
import { del, get, set } from 'idb-keyval';
import { ErrorPage } from '@components/pages';
import { ProtectedRoute } from '@components/shared';
import { QueryClient } from '@tanstack/react-query';
import {
  actionDetailsArticle,
  actionHome,
  actionProfileUser,
  loaderArticleDetailsPage,
  loaderHomePage,
} from '@api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: Infinity, refetchOnWindowFocus: false, staleTime: 1000 * 60 * 60 * 24 },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: {
    getItem: async (key: string) => {
      const item = await get(key);
      return item ? JSON.stringify(item) : null;
    },
    removeItem: async (key: string) => await del(key),
    setItem: async (key: string, value: string) => set(key, JSON.parse(value)),
  },
});

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

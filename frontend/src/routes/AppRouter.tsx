import CategoriesArticles from '../pages/categories-articles';
import Dashboard from '../pages/dashboard';
import DetailsArticle from '../pages/details-article';
import Home from '../pages/home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'categories/:category/articles',
        element: <CategoriesArticles />,
      },
      {
        path: 'categories/:category/articles/article/:id',
        element: <DetailsArticle />,
      },
    ],
  },
]);

export default router;

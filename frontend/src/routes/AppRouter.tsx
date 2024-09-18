import CategoriesArticles from '../pages/categories-articles';
import Dashboard from '../pages/dashboard';
import DetailsArticle from '../pages/details-article';
import Home from '../pages/home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>Error page home</div>,
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
            path: 'article/:id',
            element: <DetailsArticle />,
          },
        ],
      },
    ],
  },
]);

export default router;

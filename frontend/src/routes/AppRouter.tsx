import CategoriesArticles from '../pages/categories-articles';
import Dashboard from '../pages/dashboard';
import DetailsArticle from '../pages/details-article';
import GridArticles from '../pages/grid-articles';
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
            index: true,
            element: <GridArticles />,
            errorElement: <div>Error grid list articles</div>,
          },
          {
            path: 'article/:id',
            element: <DetailsArticle />,
            errorElement: <div>Error page details article</div>,
          },
        ],
      },
    ],
  },
]);

export default router;

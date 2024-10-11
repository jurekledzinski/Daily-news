import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

interface UseRouteError extends Error {
  statusText: string;
}

export const ErrorPage = () => {
  const error = useRouteError() as UseRouteError;

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

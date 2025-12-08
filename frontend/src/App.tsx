import { Outlet, ScrollRestoration } from 'react-router';

export const App = () => {
  return (
    <>
      <Outlet />
      <ScrollRestoration getKey={(location) => location.pathname} />
    </>
  );
};

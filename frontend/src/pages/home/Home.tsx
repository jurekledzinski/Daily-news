import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="container">
      <header className="header">
        <nav className="header_nav">Daily news</nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

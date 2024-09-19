import { Outlet } from 'react-router-dom';
import { Header } from '../../components/pages';
import './Home.css';

export const Home = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        All rights reserved © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

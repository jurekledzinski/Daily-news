import React from 'react';
import ReactDOM from 'react-dom/client';
import router from '@/routes/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/store';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer position="top-right" theme="light" autoClose={1500} />
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

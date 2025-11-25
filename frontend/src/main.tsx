import React from 'react';
import ReactDOM from 'react-dom/client';
import router from '@/routes/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/store';
import './styles/main.css';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-left" />
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

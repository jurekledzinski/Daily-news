import React from 'react';
import ReactDOM from 'react-dom/client';
import router, { asyncStoragePersister, queryClient } from '@routes/AppRouter';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@store';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-left" toastOptions={{ duration: 2000 }} />
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </PersistQueryClientProvider>
  </React.StrictMode>
);

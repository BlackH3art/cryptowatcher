import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { App } from './App.tsx';
import { queryClient } from '@/configs/queryClient.ts';
import { AppContextProvider } from '@/context/AppContext.tsx';
import { TokenContextProvider } from '@/context/TokensContext.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <TokenContextProvider>
            <App />
          </TokenContextProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);

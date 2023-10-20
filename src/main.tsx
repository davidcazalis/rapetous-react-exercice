import { ApiClientProvider } from '@/components/ApiClient';
import { ApiClient } from '@/lib/api-client';
import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import BattleRouter from './routes/router';

const client = new ApiClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApiClientProvider client={client}>
      <BattleRouter />
    </ApiClientProvider>
  </React.StrictMode>
);

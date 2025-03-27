import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from '@src/app';
import './index.scss';

const appContainer = document.querySelector('#root') as Element;
const reactRoot = createRoot(appContainer);

const client = new QueryClient();

reactRoot.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
);

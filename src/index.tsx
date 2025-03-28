import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@src/app';

const appContainer = document.querySelector('#root') as Element;
const reactRoot = createRoot(appContainer);

reactRoot.render(<App />);

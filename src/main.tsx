import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { VaultProvider } from './lib/vault';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <VaultProvider>
        <App />
      </VaultProvider>
    </HashRouter>
  </React.StrictMode>,
);

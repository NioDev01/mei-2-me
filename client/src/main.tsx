import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './globals.css'
import App from './App.tsx'
import { initializeClarity } from './utils/clarity';
import { AuthProvider } from '@/context/AuthContext';

// Inicializa o Clarity
initializeClarity();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
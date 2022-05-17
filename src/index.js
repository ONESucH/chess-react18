import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import MainChess from './pages/MainChess/MainChess';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <MainChess />
  </StrictMode>
);

reportWebVitals();
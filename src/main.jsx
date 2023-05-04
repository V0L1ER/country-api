import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import './index.css'
import AppRouter from './router'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </BrowserRouter>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from './context/AdminContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AdminProvider>
      <App />
       <Toaster />
    </AdminProvider>
   
  </BrowserRouter>
)

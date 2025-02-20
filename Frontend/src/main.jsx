import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from "react-hot-toast";


ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <App />
    <Toaster position="top-center" />
    </>
);


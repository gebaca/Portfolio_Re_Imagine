import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Home from './routes/Home.tsx';
import About from './routes/About.tsx';
import Work from './routes/Work.tsx';
import Contacts from './routes/Contacts.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    // App es el layout raíz — contiene el <nav> y el <Outlet />
    path: '/',
    element: <App />,
    children: [
      {
        // index: true → se renderiza cuando la URL es exactamente "/"
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'works',
        element: <Work />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

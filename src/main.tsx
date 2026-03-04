import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.tsx';
import Home from './routes/Home.tsx';
import About from './routes/About.tsx';
import Work from './routes/Work.tsx';
import Contacts from './routes/Contacts.tsx';
import { CircleTransitionProvider } from './components/Circle/CircleTransitionContext.tsx';
import './index.css';

// Registro global de plugins GSAP — una sola vez para toda la app
gsap.registerPlugin(ScrollTrigger);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'works', element: <Work /> },
      { path: 'contacts', element: <Contacts /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CircleTransitionProvider>
      <RouterProvider router={router} />
    </CircleTransitionProvider>
  </React.StrictMode>
);

import { Outlet } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';

// App es SOLO el layout: nav fijo + área de contenido.
// Nunca renderiza contenido de página directamente.
// React Router inyecta la página activa en <Outlet />.

function App() {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <nav className='w-full p-8 fixed top-0 z-50'>
        <Logo />
      </nav>

      <main className='flex-grow flex items-center justify-center w-full'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

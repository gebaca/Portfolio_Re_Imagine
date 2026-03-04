import { Outlet } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-white overflow-x-hidden'>
      {/* Logo es fixed internamente — el nav solo existe como contenedor semántico */}
      <nav className='pointer-events-none fixed top-0 left-0 z-50'>
        <div className='pointer-events-auto'>
          <Logo />
        </div>
      </nav>

      {/* Sin pt-32 — el contenido de cada página gestiona su propio spacing */}
      <main className='w-full flex-1 flex flex-col mt-32'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

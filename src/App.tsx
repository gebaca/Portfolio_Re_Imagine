import { Outlet } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';

function App() {
  return (
    // 1. Añadimos bg-slate-950 (o el color que prefieras)
    // 2. Añadimos min-h-screen para que el fondo cubra TODA la pantalla
    <div className='min-h-screen flex flex-col bg-white overflow-x-hidden'>
      <nav className='w-full p-8 fixed top-0 z-50 pointer-events-none'>
        <div className='pointer-events-auto'>
          <Logo />
        </div>
      </nav>

      {/* Añadimos flex-1 para que el main empuje hacia abajo 
          y mantenemos tu alineación de diseño 
      */}
      <main className='w-full flex-1 flex flex-col pt-32 px-8 md:px-20 lg:px-32 relative z-10'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

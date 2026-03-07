import { Outlet } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';

function App() {
  return (
    <div
      style={{ position: 'relative' }}
      className='min-h-screen flex flex-col bg-white overflow-x-hidden'
    >
      <nav className='pointer-events-none fixed top-0 left-0 z-50 pr-10 pt-10'>
        <div className='pointer-events-auto'>
          <Logo />
        </div>
      </nav>

      <main className='w-full flex-1 flex flex-col'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div
      style={{ position: 'relative' }}
      className='min-h-screen flex flex-col bg-white overflow-x-hidden'
    >
      <nav className='pointer-events-none fixed top-0 left-0 z-50 w-full flex justify-between items-start pr-10 pt-10'>
        <div className='pointer-events-auto'>
          <Logo />
        </div>

        {/* Nav links — ocultos en Home porque los círculos ya son la nav */}
        {!isHome && (
          <div
            className='pointer-events-auto flex gap-8 items-center'
            style={{ paddingTop: '6px' }}
          >
            {['about', 'works', 'contacts'].map((route) => (
              <NavLink
                key={route}
                to={`/${route}`}
                style={({ isActive }) => ({
                  fontFamily: 'Pencil-Regular, cursive',
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: isActive ? '#111' : 'rgba(0,0,0,0.35)',
                  textDecoration: 'none',
                  transition: 'color 0.25s ease',
                  borderBottom: isActive
                    ? '1px solid #111'
                    : '1px solid transparent',
                  paddingBottom: '2px',
                })}
              >
                {route}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <main className='w-full flex-1 flex flex-col'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

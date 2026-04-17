// src/App.tsx
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';
import { routeCircleMap } from './tokens/theme';
import { SharedCircle } from './components/Circle/SharedCircle';

const NAV_ROUTES = [
  { path: '/about', label: 'About', color: routeCircleMap['/about'] },
  { path: '/works', label: 'Works', color: routeCircleMap['/works'] },
  { path: '/contacts', label: 'Contacts', color: routeCircleMap['/contacts'] },
];

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <SharedCircle />

      <nav className='pointer-events-none fixed top-0 left-0 z-50 w-full flex justify-between items-start pr-10 pt-10'>
        <div className='pointer-events-auto'>
          <Logo />
        </div>
        {!isHome && (
          <div
            className='pointer-events-auto flex gap-6 items-center'
            id='desktop-nav'
          >
            {NAV_ROUTES.map(({ path, label, color }) => (
              <NavLink key={path} to={path} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'Pencil-Regular, sans-serif',
                      fontSize: '0.85rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: isActive ? '#111' : 'rgba(0,0,0,0.35)',
                      borderBottom: isActive
                        ? '1px solid #111'
                        : '1px solid transparent',
                      paddingBottom: '2px',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: color,
                        flexShrink: 0,
                        opacity: isActive ? 1 : 0.5,
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                        display: 'inline-block',
                      }}
                    />
                    {label}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <main className='w-full flex-1 flex flex-col overflow-x-hidden'>
        <Outlet />
      </main>

      {!isHome && (
        <nav
          className='fixed z-50'
          id='mobile-tab-bar'
          style={{
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '999px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '0.5rem 1.25rem',
            gap: '0.25rem',
            alignItems: 'center',
          }}
        >
          {NAV_ROUTES.map(({ path, label, color }) => (
            <NavLink key={path} to={path} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'Pencil-Regular, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.5rem 0.9rem',
                    borderRadius: '999px',
                    color: isActive ? '#111' : 'rgba(0,0,0,0.4)',
                    background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
                    transition: 'color 0.25s ease, background 0.25s ease',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: color,
                      flexShrink: 0,
                      opacity: isActive ? 1 : 0.4,
                      transition: 'opacity 0.25s ease',
                      display: 'inline-block',
                    }}
                  />
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}

export default App;

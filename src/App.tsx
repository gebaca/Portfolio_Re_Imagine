import './index.css';
import { Logo } from './components/Logo/Logo.tsx';
import { useSquiggly } from './hooks/useSquiggly.ts';

function App() {
  const { containerRef, startWiggle, stopWiggle } = useSquiggly(3);
  return (
    /* min-h-screen: Que ocupe todo el alto del navegador.
       flex flex-col: Para apilar las secciones una debajo de otra.
       items-center: Centra horizontalmente.
       bg-slate-950: Un fondo oscuro profundo (muy de diseñador).
    */
    <div className='min-h-screen w-full bg-slate-950 flex flex-col items-center'>
      {/* 1. Header / Nav (Opcional) */}
      <nav className='w-full max-w-7xl p-6 flex justify-between items-center'>
        <Logo />
        <div className='text-slate-400 space-x-6'>
          <a href='#work' className='hover:text-white transition'>
            Work
          </a>
          <a href='#about' className='hover:text-white transition'>
            About
          </a>
        </div>
      </nav>

      {/* 2. Main Content Container 
          max-w-7xl: Limita el ancho para que no se vea gigante en monitores UltraWide.
          px-4: Margen interno para móviles.
      */}
      <main className='w-full max-w-7xl px-4 flex-grow flex flex-col'>
        {/* Aquí irán tus secciones */}
        <section className='h-[80vh] flex items-center justify-center'>
          <h1 className='text-white text-7xl font-bold'>Hero Section</h1>
          <div
            ref={containerRef}
            onMouseEnter={startWiggle}
            onMouseLeave={stopWiggle}
          >
            <div className='animate-target w-10 h-10 bg-red-500' />
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <footer className='py-10 text-slate-500'>© 2026 - Hecho con GSAP</footer>
    </div>
  );
}
export default App;

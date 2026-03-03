import { useState } from 'react';
import WiggleCircle from '../components/Circle/WiggleCircle';

// Home NO necesita min-h-screen ni flex layout propio —
// App ya se encarga de centrar el contenido en pantalla completa.
// Aquí solo defines QUÉ se muestra, no CÓMO se posiciona en la página.

function Home() {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  return (
    <div className='flex gap-16 items-center justify-center p-32'>
      <WiggleCircle
        route='/about'
        color='#FDDA0D'
        label='About'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
      <WiggleCircle
        route='/works'
        color='#DE0A00'
        label='Works'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
      <WiggleCircle
        route='/contacts'
        color='#00C4FF'
        label='Contacts'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
    </div>
  );
}

export default Home;

import WiggleCircle from '../components/Circle/WiggleCircle';

// Home NO necesita min-h-screen ni flex layout propio —
// App ya se encarga de centrar el contenido en pantalla completa.
// Aquí solo defines QUÉ se muestra, no CÓMO se posiciona en la página.

function Home() {
  return (
    <div className='flex gap-16 items-center justify-center'>
      <WiggleCircle route='/about' color='#FDDA0D' label='About' />
      <WiggleCircle route='/works' color='#FF5733' label='Works' />
      <WiggleCircle route='/contacts' color='#4ECDC4' label='Contacts' />
    </div>
  );
}

export default Home;

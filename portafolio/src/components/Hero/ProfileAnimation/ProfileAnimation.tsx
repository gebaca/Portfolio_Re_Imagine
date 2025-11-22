import React, { useEffect } from 'react';
import { useCycle, motion } from 'framer-motion';
import styles from './ProfileAnimation.module.css';
import { PROFILE_FRAMES } from '../../../assets/profileFrames';

interface ProfileAnimationProps {
  animationIntervalMs?: number;
  className?: string; // Para clases externas que modifiquen el contenedor principal
}

const ProfileAnimation: React.FC<ProfileAnimationProps> = ({
  animationIntervalMs = 1500,
  className,
}) => {
  // 1. Lógica de Ciclo (Framer Motion)
  const [currentFrame, cycleFrame] = useCycle<string>(...PROFILE_FRAMES);

  // 2. Lógica de Tiempo (useEffect con Limpieza)
  useEffect(() => {
    const interval = setInterval(() => {
      cycleFrame();
    }, animationIntervalMs);

    // Limpieza de intervalo al desmontar (Crítico)
    return () => clearInterval(interval);
  }, [animationIntervalMs, cycleFrame]);

  // 3. Renderizado
  return (
    // 🛑 CONTENEDOR PRINCIPAL: Establece el tamaño 100x100px y la posición relativa
    <div className={`${styles.imageContainer} ${className || ''}`}>
      {/* 🖼️ MARCO TEMPORAL: Usa un div para simular las líneas gruesas */}
      <div className={styles.frameOverlay}>
        {/* IMAGEN ANIMADA: Ocupa el 100% del contenedor */}
        <motion.img
          src={currentFrame}
          alt='Animated profile picture'
          className={styles.profileImage}
          // Animación de Cross-fade
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* 🛑 Cuando tengas el SVG, lo añadirás aquí: 
      <img src={FRAME_SVG} alt="Decorative frame" className={styles.svgOverlay} aria-hidden="true" /> */}
    </div>
  );
};

export default ProfileAnimation;

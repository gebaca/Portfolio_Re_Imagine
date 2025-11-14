import React from 'react';

// Define la interfaz de las propiedades que recibirá el componente
interface ButtonProps {
  /**
   * El texto visible dentro del botón.
   */
  label: string;

  /**
   * Opcional: Manejador de eventos para el clic del botón.
   */
  onClick?: () => void;

  /**
   * Opcional: Determina si el botón debe estar deshabilitado.
   */
  disabled?: boolean;
}

/**
 * Componente Botón básico para el Design System.
 * En el futuro, se le añadirán estilos y la animación Wormwood.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      // Clases para aplicar estilos (puedes usar CSS Modules o Tailwind aquí)
      className='ds-button'
    >
      {label}
    </button>
  );
};

export default Button;

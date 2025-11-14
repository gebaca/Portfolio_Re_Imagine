import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button'; // Asegúrate de que esta ruta es correcta

describe('Button Component (Design System)', () => {
  it('debería renderizar el botón con el texto correcto', () => {
    // 1. Arrange: Renderiza el componente.
    const buttonText = 'Click para Animación';
    render(<Button label={buttonText} />);

    // 2. Act/Assert (UX): Usa getByRole para encontrar el botón por su rol y nombre accesible.
    // Esto es fundamental en las pruebas de UX/accesibilidad.
    const buttonElement = screen.getByRole('button', { name: buttonText });

    // 3. Assert (RTL): Verifica que el elemento existe en el DOM.
    expect(buttonElement).toBeInTheDocument();
  });

  it('debería usar la etiqueta HTML de botón correcta', () => {
    // 1. Arrange: Renderiza el componente.
    render(<Button label='Test' />);

    // 2. Act/Assert: Busca el elemento y verifica su tagName.
    const buttonElement = screen.getByText('Test');

    // 3. Assert: Verifica que la etiqueta DOM es 'BUTTON' (en mayúsculas).
    expect(buttonElement.tagName).toBe('BUTTON');
  });
});

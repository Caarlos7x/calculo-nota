import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultadoModal from '../components/ResultadoModal';
import { describe, it, expect, vi } from 'vitest';

describe('ResultadoModal', () => {
  it('deve exibir mensagem e chamar o callback ao clicar em "Fechar"', () => {
    const mockFechar = vi.fn();

    render(
      <ResultadoModal
        mensagem="Parabéns, você é um gênio!"
        aberto={true}
        onFechar={mockFechar}
      />
    );

    expect(screen.getByText('Resultado 🎓')).toBeInTheDocument();
    expect(screen.getByText(/Parabéns/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Fechar/i));
    expect(mockFechar).toHaveBeenCalled();
  });
});
import { describe, it, expect } from 'vitest';
import { getMensagem } from '../utils/mensagens';

describe('getMensagem', () => {
  it('deve retornar uma string válida para nota baixa (< 6)', () => {
    const mensagem = getMensagem(4.5);
    expect(typeof mensagem).toBe('string');
    expect(mensagem.length).toBeGreaterThan(0);
  });

  it('deve retornar mensagem de parabéns para nota alta (>= 9)', () => {
    const mensagem = getMensagem(9.5);
    expect(mensagem).toMatch(/Steve Jobs|TCC|ChatGPT|genial/i);
  });
});
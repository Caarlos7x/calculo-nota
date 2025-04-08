export function getMensagem(nota: number): string {
  if (nota < 6) {
    const frases = [
      '🚨 Vish meu chapa... vai ter que encarar a sub! Já prepara o cafezinho 😬',
      '💀 Nota abaixo de 6... chama o socorro e pega a pochila!',
      '🤕 Essa passou longe... bora tentar de novo na sub, guerreiro!',
      '📉 Caiu feio! Mas ainda dá tempo de virar esse jogo na recuperação!',
    ];
    return frases[Math.floor(Math.random() * frases.length)];
  } else if (nota >= 6 && nota <= 6.9) {
    return '🫣 Passou raspando que nem lixa de pedreiro... faz a sub só pra garantir!';
  } else if (nota > 6.9 && nota <= 8) {
    return '✅ Mandou bem! Nada genial, mas com honra!';
  } else {
    const frases = [
      '🎓 Steve Jobs do EAD! Até o professor pediu os slides!',
      '🚀 Nota de quem nasceu pronto pro TCC!',
      '🔥 Você colou do ChatGPT? Porque isso foi genial!',
    ];
    return frases[Math.floor(Math.random() * frases.length)];
  }
}
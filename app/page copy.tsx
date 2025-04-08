'use client';
import React, { useState, useEffect } from 'react';
import NotaInput from './components/NotaInput';
import ResultadoModal from './components/ResultadoModal';
import { getMensagem } from './utils/mensagens';
import { useDebounce } from './hooks/useDebounce';
import confetti from 'canvas-confetti';
import '../styles/global.scss';

export default function Home() {
  const [AC1, setAC1] = useState('');
  const [AC2, setAC2] = useState('');
  const [AC3, setAC3] = useState('');
  const [P1, setP1] = useState('');
  const [Psub, setPsub] = useState('');

  const debouncedP1 = useDebounce(P1, 800);

  const [MAC, setMAC] = useState(0);
  const [esperadoProva, setEsperadoProva] = useState(0);
  const [notaFinal, setNotaFinal] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState('');
  const [mostrarPsub, setMostrarPsub] = useState(false);
  const [mostrarNotaFinal, setMostrarNotaFinal] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [calculoAtivo, setCalculoAtivo] = useState(true);

  const calcularNotas = () => {
    const ac1 = parseFloat(AC1) || 0;
    const ac2 = parseFloat(AC2) || 0;
    const ac3 = parseFloat(AC3) || 0;
    const p1 = parseFloat(debouncedP1) || 0;
    const psub = parseFloat(Psub) || 0;

    const mac = (ac1 + ac2 + ac3) / 3;
    const arredondado =
      Math.floor(mac) + Math.floor((mac - Math.floor(mac)) * 100) / 100;
    setMAC(arredondado);

    const esperado = 6 - arredondado;
    setEsperadoProva(esperado);

    let final = 0;
    if (p1 < esperado) {
      setMostrarPsub(true);
    } else {
      final = p1;
      setMostrarPsub(false);
    }

    if (p1 >= esperado || psub >= esperado) {
      final = Math.max(p1, psub);
    }

    if (final > 0) {
      const nf = (arredondado + final) / 2;
      setNotaFinal(nf);
      setMostrarNotaFinal(true);
      setMensagem(getMensagem(nf));
      setMostrarModal(true);

      if (nf >= 9) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      setMostrarNotaFinal(false);
    }
  };

  useEffect(() => {
    if (calculoAtivo) {
      calcularNotas();
    }
  }, [AC1, AC2, AC3, debouncedP1, Psub]);

  const resetarFormulario = () => {
    setCalculoAtivo(false);
    setAC1('');
    setAC2('');
    setAC3('');
    setP1('');
    setPsub('');
    setMAC(0);
    setEsperadoProva(0);
    setNotaFinal(null);
    setMostrarPsub(false);
    setMostrarNotaFinal(false);
    setMensagem('');
    setMostrarModal(false);

    setTimeout(() => {
      setCalculoAtivo(true);
    }, 300);
  };

  return (
    <main>
      <ResultadoModal
        mensagem={mensagem}
        aberto={mostrarModal}
        onFechar={resetarFormulario}
      />

      <aside>
        <h4>MAC:</h4>
        <div id="MAC">{MAC.toFixed(2)}</div>
      </aside>

      {mostrarNotaFinal && notaFinal !== null && (
        <aside id="boxnotaFinal">
          <h4>NOTA FINAL:</h4>
          <div
            id="notaFinal"
            style={{
              color: notaFinal! >= 6 ? 'var(--success)' : 'var(--danger)',
            }}
          >
            {notaFinal.toFixed(2)}
          </div>
        </aside>
      )}

      <div className="row">
        <NotaInput label="AC1" value={AC1} onChange={(e) => setAC1(e.target.value)} />
        <NotaInput label="AC2" value={AC2} onChange={(e) => setAC2(e.target.value)} />
        <NotaInput label="AC3" value={AC3} onChange={(e) => setAC3(e.target.value)} />
      </div>

      {(AC1 || AC2 || AC3) && (
        <div>
          <p>
            Nota mínima esperada para a Prova: <br />
            <span style={{ color: parseFloat(P1) < esperadoProva ? 'var(--danger)' : 'inherit' }}>
              {esperadoProva.toFixed(2)}
            </span>
          </p>
        </div>
      )}

      <NotaInput label="PROVA" value={P1} onChange={(e) => setP1(e.target.value)} />

      {mostrarPsub && (
        <NotaInput label="PROVA SUB" value={Psub} onChange={(e) => setPsub(e.target.value)} />
      )}
    </main>
  );
}
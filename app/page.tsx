'use client';
import { useEffect, useState } from 'react';
import '../styles/global.scss';

export default function Home() {
  const [AC1, setAC1] = useState(0);
  const [AC2, setAC2] = useState(0);
  const [AC3, setAC3] = useState(0);
  const [P1, setP1] = useState(0);
  const [Psub, setPsub] = useState(0);
  const [MAC, setMAC] = useState(0);
  const [esperadoProva, setEsperadoProva] = useState(0);
  const [notaFinal, setNotaFinal] = useState<number | null>(null);
  const [mostrarPsub, setMostrarPsub] = useState(false);
  const [mostrarNotaFinal, setMostrarNotaFinal] = useState(false);

  useEffect(() => {
    calcularNotas();
  }, [AC1, AC2, AC3, P1, Psub]);

  const calcularNotas = () => {
    const mac = ((AC1 || 0) + (AC2 || 0) + (AC3 || 0)) / 3;
    const arredondado =
      Math.floor(mac) + Math.floor((mac - Math.floor(mac)) * 100) / 100;
    setMAC(arredondado);

    const esperado = 12 - arredondado;
    setEsperadoProva(esperado);

    let final = 0;
    if (P1 < esperado) {
      setMostrarPsub(true);
    } else {
      final = P1;
      setMostrarPsub(false);
    }

    if (P1 >= esperado || Psub >= esperado) {
      final = Math.max(P1, Psub);
    }

    if (final > 0) {
      const nf = (arredondado + final) / 2;
      setNotaFinal(nf);
      setMostrarNotaFinal(true);
    } else {
      setMostrarNotaFinal(false);
    }
  };

  return (
    <main>
      <aside>
        <h4>MAC:</h4>
        <div id="MAC">{MAC.toFixed(2)}</div>
      </aside>

      {mostrarNotaFinal && (
        <aside id="boxnotaFinal">
          <h4>NOTA FINAL:</h4>
          <div
            id="notaFinal"
            style={{
              color: notaFinal && notaFinal >= 6 ? 'var(--success)' : 'var(--danger)',
            }}
          >
            {notaFinal?.toFixed(2)}
          </div>
        </aside>
      )}

      <div className="row">
        {['AC1', 'AC2', 'AC3'].map((label, index) => (
          <div className="col" key={label}>
            <h4>{label}:</h4>
            <input
              type="number"
              onChange={(e) =>
                [setAC1, setAC2, setAC3][index](parseFloat(e.target.value) || 0)
              }
            />
          </div>
        ))}
      </div>

      {(AC1 > 0 || AC2 > 0 || AC3 > 0) && (
        <div>
          <p>
            Nota mínima esperada para a Prova: <br />
            <span style={{ color: P1 < esperadoProva ? 'var(--danger)' : 'inherit' }}>
              {esperadoProva.toFixed(2)}
            </span>
          </p>
        </div>
      )}

      <div id="boxP1">
        <h4>PROVA:</h4>
        <input
          type="number"
          onChange={(e) => setP1(parseFloat(e.target.value) || 0)}
        />
      </div>

      {mostrarPsub && (
        <div id="boxPsub">
          <h4>PROVA SUB:</h4>
          <input
            type="number"
            onChange={(e) => setPsub(parseFloat(e.target.value) || 0)}
          />
        </div>
      )}
    </main>
  );
}
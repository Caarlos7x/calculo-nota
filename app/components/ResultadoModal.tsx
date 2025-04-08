'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import './ResultadoModal.scss';

type ResultadoModalProps = {
  mensagem: string;
  aberto: boolean;
  onFechar: () => void;
};

export default function ResultadoModal({ mensagem, aberto, onFechar }: ResultadoModalProps) {
  return (
    <Dialog.Root open={aberto} onOpenChange={onFechar}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content forceMount className="dialog-container">
          <motion.div
            className="dialog-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Resultado 🎓</h2>
            <p>{mensagem}</p>
            <button onClick={onFechar}>Fechar</button>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
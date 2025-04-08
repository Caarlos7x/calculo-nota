import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';

type Props = {
  mensagem: string;
  aberto: boolean;
  onFechar: () => void;
};

export default function ResultadoModal({ mensagem, aberto, onFechar }: Props) {
  return (
    <Dialog.Root open={aberto} onOpenChange={onFechar}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content asChild>
          <motion.div
            className="dialog-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dialog.Title>Resultado 🎓</Dialog.Title>
            <Dialog.Description>{mensagem}</Dialog.Description>
            <button onClick={onFechar}>Fechar</button>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
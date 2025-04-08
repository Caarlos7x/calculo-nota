'use client';
import * as Dialog from '@radix-ui/react-dialog';
import './TesteModal.scss';

export default function TesteModal() {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Portal>
        <Dialog.Overlay className="teste-overlay" />
        <Dialog.Content className="teste-content">
          <h2>Modal Centralizado ✅</h2>
          <p>Se você está vendo isso no centro, então tá funcionando!</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
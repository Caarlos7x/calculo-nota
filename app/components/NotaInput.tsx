import { ChangeEvent } from 'react';

type NotaInputProps = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function NotaInput({ label, value, onChange }: NotaInputProps) {
  return (
    <div className="col">
      <h4>{label}:</h4>
      <input
        type="number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
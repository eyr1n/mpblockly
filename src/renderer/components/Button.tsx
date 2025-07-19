import type { PropsWithChildren } from 'react';

interface ButtonProps {
  onClick: () => void;
}

export function Button({ onClick, children }: PropsWithChildren<ButtonProps>) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

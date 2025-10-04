import React from 'react';

interface Props {
  label: string;
  onClick?: () => void;
}

export default function Button({ label, onClick }: Props): React.ReactNode {
  // TODO: Add pattern for primary/secondary/tertiary buttons
  return (
    <button
      className='bg-blue-500 text-white px-4 py-2 rounded'
      onClick={onClick}
    >
      {label}
    </button>
  );
}

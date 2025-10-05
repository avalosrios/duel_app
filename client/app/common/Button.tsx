import React from 'react';

type ButtonSize = 'default' | 'compact';
type ButtonType = 'primary' | 'default' | 'secondary';

interface Props {
  label: string;
  onClick?: () => void;
  size?: ButtonSize;
  type?: ButtonType;
  isDisabled?: boolean;
}

const TYPE_CLASS_MAP: Record<ButtonType, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  default: 'bg-gray-600 text-white hover:bg-gray-700',
  secondary:
    'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100',
};

export default function Button({
  label,
  onClick,
  size = 'default',
  type = 'default',
  isDisabled = false,
}: Props): React.ReactNode {
  const baseClasses = 'bg-blue-500 text-white rounded';
  const sizeClasses = size === 'compact' ? 'px-2 py-1 text-sm' : 'px-4 py-2';
  const typeClasses = TYPE_CLASS_MAP[type];
  const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={[baseClasses, sizeClasses, typeClasses, disabledClasses].join(
        ' '
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}

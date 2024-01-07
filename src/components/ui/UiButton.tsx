import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';
import { cn } from '../../utils/cn';

export function UiButton({
  children,
  type = 'button',
  className = '',
  disabled = false,
  ...attributes
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={cn(
        'text-white p-1 leading-4 rounded-[10px] text-sm bg-blue-500 hover:bg-blue-700 sm:text-base sm:p-2',
        className,
        { 'bg-slate-300 select-none pointer-events-none': disabled }
      )}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      {...attributes}
    >
      {children}
    </button>
  );
}

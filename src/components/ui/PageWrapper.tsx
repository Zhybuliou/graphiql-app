import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';
import { cn } from '../../utils/cn';

export function PageWrapper({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      {children}
    </div>
  );
}

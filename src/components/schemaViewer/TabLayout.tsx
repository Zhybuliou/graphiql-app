import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';

export function TabLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col gap-4 w-80 shrink-0 overflow-y-scroll p-2 text-left">
      {children}
    </div>
  );
}

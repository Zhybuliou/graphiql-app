import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';

export function TabLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col gap-4 w-80 shrink-0 overflow-y-scroll p-2 text-left bg-schema-gradient">
      {children}
      <div className="absolute -z-10 top-0 left-0 h-full w-full opacity-25 bg-schema-pattern" />
    </div>
  );
}

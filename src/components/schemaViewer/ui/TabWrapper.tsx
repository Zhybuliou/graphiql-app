import React from 'react';
import { PropsWithChildren } from '../../../types/utilityTypes';

function TabWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 w-80 p-2 text-left">{children}</div>
  );
}

export default TabWrapper;

import React from 'react';
import { PropsWithChildren } from '../../../types/utilityTypes';

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <div className="p-5 bg-gray-100 text-center text-gray-500 uppercase tracking-wider">
      {children}
    </div>
  );
}

export default SectionTitle;

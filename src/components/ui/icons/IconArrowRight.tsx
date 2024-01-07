import React from 'react';

export function IconArrowRight({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fill="currentColor"
        d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"
      />
    </svg>
  );
}

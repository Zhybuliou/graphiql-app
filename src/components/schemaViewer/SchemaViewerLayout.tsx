import React from 'react';
import { cn } from '../../utils/cn';

type SchemaViewerLayoutProps = {
  isOpen: boolean;
  buttonClose: React.ReactElement;
  queriesTab: React.ReactElement;
  openedTypeTabs: React.ReactElement[];
};

export function SchemaViewerLayout({
  isOpen,
  queriesTab,
  openedTypeTabs,
  buttonClose,
}: SchemaViewerLayoutProps) {
  return (
    <div
      className={cn(
        'absolute right-px top-0 z-20 flex h-full w-0 max-w-[calc(100vw-25px)] bg-white shadow',
        {
          'w-auto': isOpen,
        }
      )}
    >
      <div className="absolute -left-6 sm:-left-8 top-0">{buttonClose}</div>
      <div className="flex overflow-x-auto">
        {queriesTab}
        {openedTypeTabs}
      </div>
    </div>
  );
}

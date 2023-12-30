import React from 'react';
import { cn } from '../../utils/cn';

type SchemaViewerLayoutProps = {
  isOpen: boolean;
  buttonOpen: React.ReactElement;
  queriesTab: React.ReactElement;
  openedTypeTabs: React.ReactElement[];
};

export function SchemaViewerLayout({
  isOpen,
  queriesTab,
  openedTypeTabs,
  buttonOpen,
}: SchemaViewerLayoutProps) {
  return (
    <div
      className={cn(
        'absolute right-0 top-0 z-20 flex h-full w-0 max-w-[95vw] bg-blue-bg-aside shadow',
        {
          'w-auto': isOpen,
        }
      )}
    >
      <div className="absolute -left-12 -rotate-90 top-1/3">{buttonOpen}</div>
      <div className="flex overflow-x-auto">
        {queriesTab}
        {openedTypeTabs}
      </div>
    </div>
  );
}

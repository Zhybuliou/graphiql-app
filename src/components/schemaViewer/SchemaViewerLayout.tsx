import React from 'react';
import cn from '../../utils/cn';

type SchemaViewerLayoutProps = {
  isOpen: boolean;
  buttonOpen: React.ReactElement;
  queriesTab: React.ReactElement;
  openedTypeTabs: React.ReactElement[];
};

function SchemaViewerLayout({
  isOpen,
  queriesTab,
  openedTypeTabs,
  buttonOpen,
}: SchemaViewerLayoutProps) {
  return (
    <div
      className={cn(
        'absolute z-20 flex h-full right-0 top-0 bg-white shadow w-0',
        {
          'w-auto': isOpen,
        }
      )}
    >
      <div className="absolute -left-12 -rotate-90 top-1/3">{buttonOpen}</div>
      <div className="flex overflow-hidden">
        {queriesTab}
        {openedTypeTabs}
      </div>
    </div>
  );
}

export default SchemaViewerLayout;

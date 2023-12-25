import React from 'react';
import cn from '../../utils/cn';

type SchemaViewerProps = {
  isOpen: boolean;
  buttonOpen: React.ReactElement;
  queriesTab: React.ReactElement;
  openedTypeTabs: React.ReactElement[];
};

function SchemaViewer({
  isOpen,
  queriesTab,
  openedTypeTabs,
  buttonOpen,
}: SchemaViewerProps) {
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

export default SchemaViewer;

import React from 'react';

type PlaygroundLayoutProps = {
  controls: React.ReactElement;
  requestEditor: React.ReactElement;
  responseEditor: React.ReactElement;
  schemaViewer: React.ReactElement | false | undefined;
};

export function PlaygroundLayout({
  controls,
  requestEditor,
  responseEditor,
  schemaViewer,
}: PlaygroundLayoutProps) {
  return (
    <div className="relative flex flex-col w-full flex-1 bg-gray-50">
      <div className="w-full flex items-center justify-center gap-4 p-2">
        {controls}
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-full h-full flex-1 relative sm:flex-nowrap">
        {requestEditor}
        {responseEditor}
      </div>
      {schemaViewer}
    </div>
  );
}

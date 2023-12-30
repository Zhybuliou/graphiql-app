import React from 'react';

type PlaygroundLayoutProps = {
  controls: React.ReactElement;
  requestEditor: React.ReactElement;
  buttonExecute: React.ReactElement;
  responseEditor: React.ReactElement;
};

export function PlaygroundLayout({
  controls,
  requestEditor,
  buttonExecute,
  responseEditor,
}: PlaygroundLayoutProps) {
  return (
    <div className="relative flex flex-col w-full flex-1 bg-gray-50">
      <div className="w-full flex items-center justify-center gap-4 p-2">
        {controls}
      </div>
      <div className="flex justify-center w-full h-full relative">
        {requestEditor}
        {responseEditor}
        <div className="absolute z-10 top-6">{buttonExecute}</div>
      </div>
    </div>
  );
}

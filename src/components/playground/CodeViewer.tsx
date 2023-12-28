import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import cn from '../../utils/cn';

type CodeViewerProps = {
  error: Error | null;
  value: string;
  className?: string;
};

function CodeViewer({ error, value, className = '' }: CodeViewerProps) {
  const dataToDisplay = error ? error.message : value;

  const footer = <div className="h-[56px]">Footer</div>;

  return (
    <div
      className={cn(
        'relative flex flex-col bg-pink-300 p-4 w-6/12 h-full',
        { 'bg-red-500': !!error },
        className
      )}
    >
      <CodeMirror
        style={{
          textAlign: 'start',
          overflow: 'auto',
          height: '100%',
        }}
        value={dataToDisplay}
        extensions={[graphql(), EditorState.readOnly.of(true)]}
        theme="none"
        basicSetup={{
          autocompletion: false,
          foldGutter: false,
          lineNumbers: false,
          bracketMatching: true,
          highlightActiveLine: false,
        }}
        width="100%"
        height="100%"
      />
      {footer}
      {!dataToDisplay && (
        <div className="absolute flex items-center justify-center w-full h-full">
          No data! Make a request!
        </div>
      )}
    </div>
  );
}

CodeViewer.defaultProps = {
  className: '',
};
export default CodeViewer;

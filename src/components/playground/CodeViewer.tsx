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

  return (
    <div
      className={cn('bg-pink-300 p-4', { 'bg-red-500': !!error }, className)}
    >
      <CodeMirror
        style={{ textAlign: 'start', overflow: 'auto' }}
        value={dataToDisplay}
        extensions={[graphql(), EditorState.readOnly.of(true)]}
        basicSetup={{
          autocompletion: true,
        }}
        width="500px"
        minHeight="300px"
        height="1px"
      />
    </div>
  );
}

CodeViewer.defaultProps = {
  className: '',
};
export default CodeViewer;

import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import cn from '../../utils/cn';

type CodeViewerProps = {
  error: Error | null;
  value: string;
  className?: string;
  isLoading: boolean;
};

function CodeViewer({
  error,
  value,
  isLoading,
  className = '',
}: CodeViewerProps) {
  const dataToDisplay = error ? error.message : value;

  return (
    <div className={cn('relative flex flex-col w-6/12 h-full', className)}>
      {isLoading ? (
        <div className="h-full w-full">Spinner</div>
      ) : (
        <CodeMirror
          style={{
            textAlign: 'start',
            overflow: 'auto',
            height: '100%',
            paddingLeft: '16px',
            background: error ? 'red' : '',
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
      )}
      <div className="h-[56px] flex justify-end items-center px-3 bg-sky-950 text-gray-400">
        Footer
      </div>
      {!dataToDisplay && !isLoading && (
        <div className="absolute flex items-center justify-center w-[calc(100%-16px)] h-[calc(100%-16px)]">
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

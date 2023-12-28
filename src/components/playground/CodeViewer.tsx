import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
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

  const footer = <div className="h-[56px]">Footer</div>;

  return (
    <div
      className={cn(
        'relative flex flex-col bg-pink-300 p-4 w-6/12 h-full',
        className
      )}
    >
      {isLoading ? (
        <div className="h-full w-full">Spinner</div>
      ) : (
        <CodeMirror
          style={{
            textAlign: 'start',
            overflow: 'auto',
            height: '100%',
            background: error ? 'red' : '',
          }}
          value={dataToDisplay}
          extensions={[EditorState.readOnly.of(true)]}
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
      {footer}
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

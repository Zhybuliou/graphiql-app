import React from 'react';
import { EditorState } from '@uiw/react-codemirror';
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { cn } from '../../../utils/cn';
import { Editor } from './Editor';
import { EditorConfigs } from './types';
import { BASIC_SETUPS } from './basicSetups';

type ResponseEditorProps = {
  error: Error | null;
  value: string;
  className?: string;
  isLoading: boolean;
};

export function ResponseEditor({
  error,
  value,
  isLoading,
  className = '',
}: ResponseEditorProps) {
  const dataToDisplay = error ? error.message : value;

  const editorConfigs: EditorConfigs = {
    value: dataToDisplay,
    className: cn('h-full pl-4', { 'bg-red-200': !!error }),
    basicSetup: BASIC_SETUPS.response,
    theme: noctisLilac,
    extensions: [EditorState.readOnly.of(true)],
  };

  return (
    <div className={cn('relative flex flex-col w-6/12 basis-full', className)}>
      {isLoading ? (
        <div className="h-full w-full">Spinner</div>
      ) : (
        <Editor configs={editorConfigs} />
      )}
      {!dataToDisplay && !isLoading && (
        <div className="absolute flex items-center justify-center w-[calc(100%-16px)] h-[calc(100%-16px)]">
          No data! Make a request!
        </div>
      )}
    </div>
  );
}

ResponseEditor.defaultProps = {
  className: '',
};

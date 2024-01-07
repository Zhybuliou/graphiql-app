import React from 'react';
import { EditorState, EditorView } from '@uiw/react-codemirror';
import { noctisLilacInit } from '@uiw/codemirror-theme-noctis-lilac';
import { cn } from '../../../utils/cn';
import { Editor } from './Editor';
import { EditorConfigs } from './types';
import { BASIC_SETUPS } from './basicSetups';
import { SkeletonEditor } from '../../skeletons/SkeletonEditor';
import { useLocale } from '../../../context/local';

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
  const { state } = useLocale();
  const dataToDisplay = error ? error.message : value;

  const editorConfigs: EditorConfigs = {
    value: dataToDisplay,
    className: 'h-full pl-4',
    basicSetup: BASIC_SETUPS.response,
    theme: noctisLilacInit({
      settings: {
        background: error ? '#fed7d7' : '#f2f1f8',
      },
    }),
    extensions: [EditorState.readOnly.of(true), EditorView.lineWrapping],
  };

  return (
    <div className={cn('relative flex flex-col w-6/12 basis-full', className)}>
      {isLoading ? (
        <div className="h-full w-full">
          <SkeletonEditor />
        </div>
      ) : (
        <Editor configs={editorConfigs} />
      )}
      {!dataToDisplay && !isLoading && (
        <div className="absolute flex items-center justify-center w-[calc(100%-16px)] h-[calc(100%-16px)] text-gray-400">
          {state.strings.playgroundResponseNoData}
        </div>
      )}
    </div>
  );
}

ResponseEditor.defaultProps = {
  className: '',
};

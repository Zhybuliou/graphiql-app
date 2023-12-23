import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import cn from '../../utils/cn';

function ResponseEditor({
  error,
  response,
}: {
  error: Error | null;
  response: string;
}) {
  const dataToDisplay = error ? error.message : response;

  return (
    <div className={cn('bg-pink-300 p-4', { 'bg-red-500': !!error })}>
      <CodeMirror
        style={{ textAlign: 'start' }}
        value={dataToDisplay}
        height="200px"
        extensions={[graphql(), EditorState.readOnly.of(true)]}
        basicSetup={{
          autocompletion: true,
        }}
        width="500px"
        minHeight="300px"
      />
    </div>
  );
}

export default ResponseEditor;

import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useAppState } from '../../context/appState';

function ResponseEditor() {
  const { state: appState } = useAppState();
  const { outputQueryData } = appState;
  return (
    <div className="bg-pink-300 p-4">
      <CodeMirror
        style={{ textAlign: 'start' }}
        value={
          outputQueryData
            ? JSON.stringify(JSON.parse(outputQueryData), null, 2)
            : ''
        }
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

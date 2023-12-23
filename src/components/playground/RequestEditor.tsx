import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { AppStateActions, useAppState } from '../../context/appState';

function RequestEditor({ schema }: { schema: GraphQLSchema | undefined }) {
  const { state: appState, dispatch: appDispatch } = useAppState();
  const { queryString } = appState;
  return (
    <div className="bg-pink-300 p-4">
      {schema ? (
        <CodeMirror
          style={{
            textAlign: 'start',
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
            wordWrap: 'break-word',
          }}
          value={queryString}
          extensions={[graphql(schema), EditorView.lineWrapping]}
          onChange={(event) =>
            appDispatch({
              type: AppStateActions.SET_QUERY_STRING,
              payload: event,
            })
          }
          basicSetup={{
            highlightActiveLine: true,
            autocompletion: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            lintKeymap: true,
          }}
          width="500px"
          minHeight="300px"
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default RequestEditor;

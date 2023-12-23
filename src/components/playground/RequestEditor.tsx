import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';

function RequestEditor({
  schema,
  queryString,
  setQueryString,
}: {
  schema: GraphQLSchema | null;
  queryString: string;
  setQueryString: (newQuery: string) => void;
}) {
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
          onChange={setQueryString}
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

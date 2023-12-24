import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';

type RequestEditorProps = {
  schema: GraphQLSchema | null;
  queryString: string;
  setQueryString: (newQuery: string) => void;
  params: React.ReactElement;
};

function RequestEditor({
  schema,
  queryString,
  setQueryString,
  params,
}: RequestEditorProps) {
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
          height="1px"
        />
      ) : (
        <div>Loading...</div>
      )}
      {params}
    </div>
  );
}

export default RequestEditor;

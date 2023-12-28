import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';

type RequestEditorProps = {
  schema: GraphQLSchema | undefined;
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
    <div className="flex flex-col w-6/12 h-full">
      <div className="flex-1">
        <CodeMirror
          style={{
            textAlign: 'start',
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
            wordWrap: 'break-word',
            height: '100%',
          }}
          value={queryString}
          extensions={
            schema
              ? [graphql(schema), EditorView.lineWrapping]
              : [EditorView.lineWrapping]
          }
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
          theme="dark"
          width="100%"
          height="100%"
        />
      </div>
      {params}
    </div>
  );
}

export default RequestEditor;

import React, { useEffect, useRef } from 'react';
import CodeMirror, {
  EditorView,
  ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import { graphql, updateSchema } from 'cm6-graphql';
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
  const codeMirrorRef = useRef<ReactCodeMirrorRef | null>(null);
  useEffect(() => {
    if (codeMirrorRef.current?.view && schema)
      updateSchema(codeMirrorRef.current?.view, schema);
  }, [schema]);
  return (
    <div className="flex flex-col bg-pink-300 p-4 w-6/12 h-full">
      {schema ? (
        <div className="flex-1">
          <CodeMirror
            ref={codeMirrorRef}
            style={{
              textAlign: 'start',
              whiteSpace: 'pre-wrap',
              wordBreak: 'normal',
              wordWrap: 'break-word',
              height: '100%',
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
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {params}
    </div>
  );
}

export default RequestEditor;

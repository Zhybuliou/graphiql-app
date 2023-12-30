import React from 'react';
import { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { Editor } from './Editor';
import { BASIC_SETUPS, EditorConfigs } from './editorConfigs';

type RequestEditorProps = {
  schema: GraphQLSchema | undefined;
  queryString: string;
  setQueryString: (newQuery: string) => void;
  params: React.ReactElement;
};

export function RequestEditor({
  schema,
  queryString,
  setQueryString,
  params,
}: RequestEditorProps) {
  const editorConfigs: EditorConfigs = {
    value: queryString,
    onChange: setQueryString,
    theme: 'dark',
    className: 'h-full text-balance',
    extensions: schema
      ? [graphql(schema), EditorView.lineWrapping]
      : [EditorView.lineWrapping],
    basicSetup: BASIC_SETUPS.request,
  };

  return (
    <div className="flex flex-col w-6/12 h-full">
      <div className="flex-1">
        <Editor configs={editorConfigs} />
      </div>
      {params}
    </div>
  );
}

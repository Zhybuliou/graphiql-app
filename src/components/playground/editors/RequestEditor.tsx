import React from 'react';
import { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { Editor } from './Editor';
import { EditorConfigs } from './types';
import { BASIC_SETUPS } from './basicSetups';

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
    theme: noctisLilac,
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

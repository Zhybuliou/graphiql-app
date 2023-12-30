import React from 'react';
import { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { BASIC_SETUPS, EditorConfigs } from './editorConfigs';
import { Editor } from './Editor';

type ParamsEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ParamsEditor({ value, onChange }: ParamsEditorProps) {
  const editorConfigs: EditorConfigs = {
    value,
    onChange,
    theme: 'light',
    className: 'text-balance',
    extensions: [json(), EditorView.lineWrapping],
    basicSetup: BASIC_SETUPS.params,
    height: '1px',
    minHeight: '100px',
  };
  return <Editor configs={editorConfigs} />;
}

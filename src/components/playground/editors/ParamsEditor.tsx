import React from 'react';
import { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { EditorConfigs } from './types';
import { Editor } from './Editor';
import { THEMES } from './themes';
import { BASIC_SETUPS } from './basicSetups';

type ParamsEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ParamsEditor({ value, onChange }: ParamsEditorProps) {
  const editorConfigs: EditorConfigs = {
    value,
    onChange,
    theme: THEMES.params,
    className: 'text-balance',
    extensions: [json(), EditorView.lineWrapping],
    basicSetup: BASIC_SETUPS.params,
    height: '1px',
    minHeight: '100px',
  };
  return <Editor configs={editorConfigs} />;
}

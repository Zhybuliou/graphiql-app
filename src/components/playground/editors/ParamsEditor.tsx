import React from 'react';
import { EditorView } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { EditorConfigs } from './types';
import { Editor } from './Editor';
import { BASIC_SETUPS } from './basicSetups';

type ParamsEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ParamsEditor({ value, onChange }: ParamsEditorProps) {
  const editorConfigs: EditorConfigs = {
    value,
    onChange,
    theme: noctisLilac,
    className: 'text-balance',
    extensions: [langs.json(), EditorView.lineWrapping],
    basicSetup: BASIC_SETUPS.params,
    height: '1px',
    minHeight: '100px',
  };
  return <Editor configs={editorConfigs} />;
}

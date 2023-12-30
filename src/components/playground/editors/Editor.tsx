import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorConfigs } from './editorConfigs';

export function Editor({ configs }: { configs: EditorConfigs }) {
  const { width = '100%', height = '100%' } = configs;
  return <CodeMirror width={width} height={height} {...configs} />;
}

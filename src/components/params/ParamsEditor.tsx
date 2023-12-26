import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

type ParamsEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

function ParamsEditor({ value, onChange }: ParamsEditorProps) {
  return (
    <div className="bg-pink-400 p-2">
      <CodeMirror
        style={{
          textAlign: 'start',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
          wordWrap: 'break-word',
        }}
        value={value}
        extensions={[json(), EditorView.lineWrapping]}
        onChange={onChange}
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
        width="auto"
        minHeight="100px"
        height="1px"
      />
    </div>
  );
}

export default ParamsEditor;

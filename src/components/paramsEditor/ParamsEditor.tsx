import { useState } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import Button from '../ui/Button';

interface IParamsEditorProps {
  updateVariables: (data: string) => void;
}

function ParamsEditor(props: IParamsEditorProps) {
  const [isOpenVariables, setVariablesOpen] = useState(false);
  const [variables, setVariables] = useState('');
  const [isOpenHeaders, setHeadersOpen] = useState(false);
  const [headers, setHeaders] = useState('');

  const { updateVariables } = props;

  const handleVariables = (event: string) => {
    setVariables(event);
    updateVariables(JSON.parse(event));
  };

  return (
    <div>
      <div className="flex bg-indigo-900 p-4 text-white">
        <Button
          className={
            isOpenVariables
              ? 'bg-sky-500 rounded-l p-2'
              : 'bg-sky-500/50 rounded-l p-2 text-slate-400'
          }
          onClick={() => {
            setVariablesOpen(!isOpenVariables);
            setHeadersOpen(false);
          }}
        >
          Variables
        </Button>
        <Button
          className={
            isOpenHeaders
              ? 'bg-sky-500  p-2'
              : 'bg-sky-500/50  p-2 text-slate-400'
          }
          onClick={() => {
            setHeadersOpen(!isOpenHeaders);
            setVariablesOpen(false);
          }}
        >
          Headers
        </Button>
      </div>
      {isOpenVariables && (
        <div className="bg-pink-400 p-2">
          <CodeMirror
            style={{
              textAlign: 'start',
              whiteSpace: 'pre-wrap',
              wordBreak: 'normal',
              wordWrap: 'break-word',
            }}
            value={variables}
            extensions={[graphql(), EditorView.lineWrapping]}
            onChange={(event) => handleVariables(event)}
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
            minHeight="80px"
          />
        </div>
      )}
      {isOpenHeaders && (
        <div className="bg-emerald-400 p-2">
          <CodeMirror
            style={{
              textAlign: 'start',
              whiteSpace: 'pre-wrap',
              wordBreak: 'normal',
              wordWrap: 'break-word',
            }}
            value={headers}
            extensions={[graphql(), EditorView.lineWrapping]}
            onChange={(event) => setHeaders(event)}
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
            minHeight="80px"
          />
        </div>
      )}
    </div>
  );
}

export default ParamsEditor;

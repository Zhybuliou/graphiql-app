/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import Button from '../ui/Button';
import { useLocale } from '../../context/local';

function ParamsEditor() {
  const { state, dispatch } = useLocale();
  const [isOpenVariables, setVariablesOpen] = useState(false);
  const [isOpenHeaders, setHeadersOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2.5 bg-indigo-900 p-4 text-white">
        <Button
          className={
            isOpenVariables
              ? 'bg-sky-500 rounded-l p-2 transition-colors duration-300'
              : 'bg-sky-500/50 rounded-l p-2 text-slate-400 transition-colors duration-300'
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
              ? 'bg-sky-500 rounded-l p-2 transition-colors duration-300'
              : 'bg-sky-500/50 rounded-l p-2 text-slate-400 transition-colors duration-300'
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
            value={state.variables}
            extensions={[json(), EditorView.lineWrapping]}
            onChange={(event) =>
              dispatch({ type: 'SET_VARIABLES', payload: event })
            }
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
            value={state.headers}
            extensions={[json(), EditorView.lineWrapping]}
            onChange={(event) =>
              dispatch({ type: 'SET_HEADERS', payload: event })
            }
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

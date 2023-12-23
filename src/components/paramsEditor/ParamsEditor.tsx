import { useState } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import Button from '../ui/Button';
import cn from '../../utils/cn';

enum DisplayState {
  closeAll,
  headers,
  variables,
}

type ParamsEditorProps = {
  headers: string;
  variables: string;
  setHeaders: (newHeaders: string) => void;
  setVariables: (newVariables: string) => void;
};

function ParamsEditor({
  headers,
  variables,
  setHeaders,
  setVariables,
}: ParamsEditorProps) {
  const [displayState, setDisplayState] = useState<DisplayState>(
    DisplayState.closeAll
  );

  const editorValue =
    displayState === DisplayState.variables ? variables : headers;
  const onChange =
    displayState === DisplayState.variables ? setVariables : setHeaders;

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2.5 bg-indigo-900 p-4 text-white">
        <Button
          className={cn({
            'bg-sky-500/50 text-slate-400':
              displayState === DisplayState.variables,
          })}
          onClick={() => {
            setDisplayState((prevDisplayState) => {
              return prevDisplayState === DisplayState.variables
                ? DisplayState.closeAll
                : DisplayState.variables;
            });
          }}
        >
          Variables
        </Button>
        <Button
          className={cn({
            'bg-sky-500/50 text-slate-400':
              displayState === DisplayState.headers,
          })}
          onClick={() => {
            setDisplayState((prevDisplayState) => {
              return prevDisplayState === DisplayState.headers
                ? DisplayState.closeAll
                : DisplayState.headers;
            });
          }}
        >
          Headers
        </Button>
      </div>
      <div className="bg-pink-400 p-2">
        <CodeMirror
          style={{
            textAlign: 'start',
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
            wordWrap: 'break-word',
          }}
          value={editorValue}
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
          minHeight="80px"
        />
      </div>
    </div>
  );
}

export default ParamsEditor;

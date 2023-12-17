import { useState, useEffect } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import Button from '../ui/Button';
import CodeMirrorType from '../../types/enums/codeMirrorType';
import { IParamsEditorProps } from '../../types/interfaces/IParamsEditorProps';
import { IEditorParamsState } from '../../types/interfaces/IEditorParamsState';

function ParamsEditor(props: IParamsEditorProps) {
  const [isOpenVariables, setVariablesOpen] = useState(false);
  const [params, setParams] = useState<IEditorParamsState>({
    variables: '',
    additionalHeaders: '',
  });

  const [isOpenHeaders, setHeadersOpen] = useState(false);

  const { updateParams } = props;

  useEffect(() => {
    updateParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const handleChange = (type: CodeMirrorType) => (value: string) => {
    setParams({ ...params, [type]: value });
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
            value={params.variables}
            extensions={[graphql(), EditorView.lineWrapping]}
            onChange={handleChange(CodeMirrorType.VARIABLES)}
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
            value={params.additionalHeaders}
            extensions={[graphql(), EditorView.lineWrapping]}
            onChange={handleChange(CodeMirrorType.additionalHeaders)}
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

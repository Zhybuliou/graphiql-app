import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import { IEditorParamsState } from '../../types/interfaces/IEditorParamsState';

export default function CodeEditor() {
  const [value, setValue] = useState(`query myChar($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        name
        id
      }
    }
  }
  `);
  const [urlValue, setUrlValue] = useState(
    'https://rickandmortyapi.com/graphql'
  );
  const [output, setOutput] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [editorParams, setEditorParams] = useState({
    variables: '',
    additionalHeaders: '',
  });

  const updateParamsEditor = (data: IEditorParamsState) => {
    setEditorParams(data);
  };

  const onError = (err: Error) => {
    toast.error(`Variables are written incorrectly ${err.message} `, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const checkRequestBody = (query: string) => {
    const { variables } = editorParams;

    let body = JSON.stringify({ query });
    if (variables.length > 0) {
      try {
        body = JSON.stringify({ query, variables: JSON.parse(variables) });
      } catch (er) {
        if (er instanceof Error) {
          setErrorMsg(er.message);
          onError(er);
        }
      }
    }
    return body;
  };

  const checkRequestHeaders = () => {
    const { additionalHeaders } = editorParams;

    let headers = {
      'Content-Type': 'application/json',
    };
    if (additionalHeaders.length > 0) {
      try {
        headers = { ...JSON.parse(additionalHeaders), ...headers };
      } catch (er) {
        if (er instanceof Error) onError(er);
      }
    }
    return headers;
  };

  const helpR = async (query: string, url: string) => {
    const body = checkRequestBody(query);
    const headers = checkRequestHeaders();

    if (errorMsg) {
      setOutput(JSON.stringify(errorMsg));
    } else {
      const result = await fetch(url, {
        method: 'POST',
        headers,
        body,
      })
        .then((res) => res.json())
        .catch(() => setError(true));

      setOutput(JSON.stringify(result));
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: 'blueviolet', padding: '15px' }}>
        <input
          value={urlValue}
          onChange={(event) => {
            setUrlValue(event.target.value);
            setError(false);
          }}
          style={{ width: '100%', padding: '3px' }}
          type="text"
        />
        {error && <p>Wrong graphql Url</p>}
        <button
          style={{
            border: 'solid 1px black',
            backgroundColor: '#3B82F6',
            color: '#fff',
            padding: '10px',
            borderRadius: '14px',
            marginTop: '10px',
          }}
          type="button"
          onClick={() => helpR(value, urlValue)}
        >
          Run
        </button>
        <button
          style={{
            border: 'solid 1px black',
            backgroundColor: '#3B82F6',
            color: '#fff',
            padding: '10px',
            borderRadius: '14px',
            margin: '10px',
          }}
          type="button"
        >
          Prettifying
        </button>
        <button
          style={{
            border: 'solid 1px black',
            backgroundColor: '#3B82F6',
            color: '#fff',
            padding: '10px',
            borderRadius: '14px',
            margin: '10px',
          }}
          type="button"
        >
          Schema
        </button>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ backgroundColor: 'pink', padding: '15px' }}>
          <CodeMirror
            style={{
              textAlign: 'start',
              whiteSpace: 'pre-wrap',
              wordBreak: 'normal',
              wordWrap: 'break-word',
            }}
            value={value}
            extensions={[graphql(), EditorView.lineWrapping]}
            onChange={(event) => setValue(event)}
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
            width="500px"
            minHeight="500px"
          />
        </div>
        <div style={{ backgroundColor: 'pink', padding: '15px' }}>
          <CodeMirror
            style={{ textAlign: 'start' }}
            value={output ? JSON.stringify(JSON.parse(output), null, 2) : ''}
            height="200px"
            extensions={[graphql(), EditorState.readOnly.of(true)]}
            basicSetup={{
              autocompletion: true,
            }}
            minWidth="500px"
            minHeight="500px"
          />
        </div>
      </div>
      <ParamsEditor updateParams={updateParamsEditor} />
    </div>
  );
}

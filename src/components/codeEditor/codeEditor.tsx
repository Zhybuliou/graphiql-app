import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useState } from 'react';
import prettifyGraphQLQuery from './prettifyGraphQLQuery';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import { IEditorParamsState } from '../../types/interfaces/IEditorParamsState';
import RequestOptions from '../../types/enums/requestOptions';

export default function CodeEditor() {
  const [value, setValue] = useState(`query ($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        name
      }
    }
  }
  `);
  const [urlValue, setUrlValue] = useState(
    'https://rickandmortyapi.com/graphql'
  );
  const [output, setOutput] = useState('');
  const [error, setError] = useState(false);
  const [editorParams, setEditorParams] = useState({
    variables: '',
    headers: '',
    pretti: false,
  });

  const updateParamsEditor = (data: IEditorParamsState) => {
    setEditorParams({ ...data, pretti: false });
  };

  const checkRequestParams = (paramType: RequestOptions, query?: string) => {
    const { headers, variables } = editorParams;

    const defoultHeaders = {
      'Content-Type': 'application/json',
    };

    const param = paramType === RequestOptions.VARIABLES ? variables : headers;

    if (param) {
      try {
        const parsedParam = JSON.parse(param);
        if (parsedParam && typeof parsedParam === 'object') {
          return paramType === RequestOptions.VARIABLES
            ? JSON.stringify({ query, variables: parsedParam })
            : { ...parsedParam, ...defoultHeaders };
        }
      } catch (er) {
        if (er instanceof Error) {
          const newErrorMsg = `${paramType} are written incorrectly ${er.message}`;
          setOutput(JSON.stringify(newErrorMsg));
        }
        return null;
      }
    }

    return paramType === RequestOptions.VARIABLES
      ? JSON.stringify({ query })
      : defoultHeaders;
  };

  const helpR = async (query: string, url: string) => {
    const body = checkRequestParams(RequestOptions.VARIABLES, query);
    const headers = checkRequestParams(RequestOptions.HEADERS);

    if (body && headers) {
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
          onClick={() => {
            setValue(prettifyGraphQLQuery(value));
            setEditorParams({ ...editorParams, pretti: true });
          }}
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
            minHeight="300px"
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
            width="500px"
            minHeight="300px"
          />
        </div>
      </div>
      <ParamsEditor
        updateParams={updateParamsEditor}
        pretti={editorParams.pretti}
      />
    </div>
  );
}

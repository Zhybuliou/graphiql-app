import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import {
  GraphQLSchema,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';
import { graphql } from 'cm6-graphql';
import { useEffect, useState } from 'react';
import prettifyGraphQLQuery from './prettifyGraphQLQuery';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import RequestOptions from '../../types/enums/requestOptions';
import { useLocale } from '../../context/local';

export default function CodeEditor() {
  const { state, dispatch } = useLocale();

  const [error, setError] = useState(false);
  const [getSchema, setGetSchema] = useState<GraphQLSchema>();

  const checkRequestParams = (
    paramType: RequestOptions,
    headers: string,
    variables: string,
    query?: string
  ) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const param = paramType === RequestOptions.VARIABLES ? variables : headers;

    if (param) {
      try {
        const parsedParam = JSON.parse(param);
        if (parsedParam && typeof parsedParam === 'object') {
          return paramType === RequestOptions.VARIABLES
            ? JSON.stringify({ query, variables: parsedParam })
            : { ...parsedParam, ...defaultHeaders };
        }
      } catch (er) {
        if (er instanceof Error) {
          const newErrorMsg = `${paramType} are written incorrectly ${er.message}`;
          dispatch({ type: 'SET_QUERY_DATA', payload: newErrorMsg });
        }
        return null;
      }
    }

    return paramType === RequestOptions.VARIABLES
      ? JSON.stringify({ query })
      : defaultHeaders;
  };

  const getGraphQlResponse = async (
    query: string,
    url: string,
    headersString: string,
    variablesString: string
  ) => {
    const body = checkRequestParams(
      RequestOptions.VARIABLES,
      headersString,
      variablesString,
      query
    );
    const headers = checkRequestParams(
      RequestOptions.HEADERS,
      headersString,
      variablesString
    );

    if (body && headers) {
      const result = await fetch(url, {
        method: 'POST',
        headers,
        body,
      })
        .then((res) => res.json())
        .catch(() => setError(true));
      dispatch({ type: 'SET_QUERY_DATA', payload: JSON.stringify(result) });
    }
  };

  async function createGraphQlSchema(endpoint: string) {
    const query = getIntrospectionQuery();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
      body: JSON.stringify({ query }),
    });
    const schema = await response.json();
    setGetSchema(buildClientSchema(schema.data));
  }

  useEffect(() => {
    createGraphQlSchema(state.endpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: 'blueviolet', padding: '15px' }}>
        <input
          value={state.endpoint}
          onChange={(event) => {
            dispatch({ type: 'SET_ENDPOINT', payload: event.target.value });
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
          onClick={() =>
            getGraphQlResponse(
              state.queryString,
              state.endpoint,
              state.headers,
              state.variables
            )
          }
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
            dispatch({
              type: 'SET_QUERY_STRING',
              payload: prettifyGraphQLQuery(state.queryString),
            });
            dispatch({
              type: 'SET_VARIABLES',
              payload: prettifyGraphQLQuery(state.variables),
            });
            dispatch({
              type: 'SET_HEADERS',
              payload: prettifyGraphQLQuery(state.headers),
            });
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
          {getSchema ? (
            <CodeMirror
              style={{
                textAlign: 'start',
                whiteSpace: 'pre-wrap',
                wordBreak: 'normal',
                wordWrap: 'break-word',
              }}
              value={state.queryString}
              extensions={[graphql(getSchema), EditorView.lineWrapping]}
              onChange={(event) =>
                dispatch({ type: 'SET_QUERY_STRING', payload: event })
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
              width="500px"
              minHeight="300px"
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div style={{ backgroundColor: 'pink', padding: '15px' }}>
          <CodeMirror
            style={{ textAlign: 'start' }}
            value={
              state.outputQueryData
                ? JSON.stringify(JSON.parse(state.outputQueryData), null, 2)
                : ''
            }
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
      <ParamsEditor />
    </div>
  );
}

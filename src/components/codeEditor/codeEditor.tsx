import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { graphql } from 'cm6-graphql';
import { useEffect, useState } from 'react';
import prettifyGraphQLQuery from './prettifyGraphQLQuery';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import { useLocale } from '../../context/local';
import getGraphQlResponse from './getGraphQlResponse';
import createGraphQlSchema from './createGraphQlSchema';

export default function CodeEditor() {
  const { state, dispatch } = useLocale();
  const [error, setError] = useState(false);
  const [getSchema, setGetSchema] = useState<GraphQLSchema>();

  useEffect(() => {
    const saveSchema = async () => {
      const schema = await createGraphQlSchema(state.endpoint);
      setGetSchema(schema);
    };
    saveSchema();
  }, [state.endpoint]);

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
              state.variables,
              dispatch
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

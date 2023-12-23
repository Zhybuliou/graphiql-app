import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import {
  GraphQLSchema,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';
import { graphql } from 'cm6-graphql';
import React, { useEffect, useState } from 'react';
import prettifyGraphQLQuery from '../../utils/prettifyGraphQLQuery';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import { useLocale } from '../../context/local';
import { IconPlay } from '../ui/icons/IconPlay';
import { IconSparkles } from '../ui/icons/IconSparkles';
import Schema from '../schema/Schema';
import PageWrapper from '../ui/PageWrapper';
import Button from '../ui/Button';
import { makeRequest } from '../../services/makeRequest';
import { createBodyOfRequest } from '../../utils/createBodyOfRequest';
import { createHeadersOfRequest } from '../../utils/createHeadersOfRequest';

export default function CodeEditor() {
  const { state, dispatch } = useLocale();
  const [error, setError] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [isOpenSchema, setIsOpenSchema] = useState<boolean>(false);

  useEffect(() => {
    const getSchema = async () => {
      const headers = createHeadersOfRequest('');
      const query = getIntrospectionQuery();
      const body = createBodyOfRequest('', query);
      const schemaData = await makeRequest(state.endpoint, headers, body);
      const clientSchema = buildClientSchema(schemaData.data);
      setSchema(clientSchema);
    };

    getSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGraphQlResponse() {
    try {
      const headers = createHeadersOfRequest(state.headers);
      const body = createBodyOfRequest(state.variables, state.queryString);

      const data = await makeRequest(state.endpoint, headers, body);

      dispatch({ type: 'SET_QUERY_DATA', payload: JSON.stringify(data) });
    } catch (err) {
      if (err instanceof Error) {
        const newErrorMsg = `Error ${err.message}`;
        dispatch({
          type: 'SET_QUERY_DATA',
          payload: JSON.stringify(newErrorMsg),
        });
      }
    }
  }

  return (
    <PageWrapper>
      <div className="w-full bg-fuchsia-900 p-5">
        <input
          value={state.endpoint}
          onChange={(event) => {
            dispatch({ type: 'SET_ENDPOINT', payload: event.target.value });
            setError(false);
          }}
          className="w-full p-1 mb-5"
          type="text"
        />
        {error && <p>Wrong graphql Url</p>}
        <div className="flex items-center justify-center gap-2.5">
          <Button type="button" onClick={() => getGraphQlResponse()}>
            <IconPlay />
          </Button>
          <Button
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
            <IconSparkles />
          </Button>
          <Button
            type="button"
            onClick={() => setIsOpenSchema((isOpen) => !isOpen)}
          >
            Schema
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="bg-pink-300 p-4">
          {schema ? (
            <CodeMirror
              style={{
                textAlign: 'start',
                whiteSpace: 'pre-wrap',
                wordBreak: 'normal',
                wordWrap: 'break-word',
              }}
              value={state.queryString}
              extensions={[graphql(schema), EditorView.lineWrapping]}
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
        <div className="bg-pink-300 p-4">
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
      {isOpenSchema && <Schema clientSchema={schema} />}
    </PageWrapper>
  );
}

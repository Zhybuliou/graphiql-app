import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
} from 'graphql';
import { graphql } from 'cm6-graphql';
import React, { useEffect, useState } from 'react';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import { IconPlay } from '../ui/icons/IconPlay';
import { IconSparkles } from '../ui/icons/IconSparkles';
import Schema from '../schema/Schema';
import PageWrapper from '../ui/PageWrapper';
import Button from '../ui/Button';
import { makeRequest } from '../../services/makeRequest';
import { createBodyOfRequest } from '../../utils/createBodyOfRequest';
import { createHeadersOfRequest } from '../../utils/createHeadersOfRequest';
import { AppStateActions, useAppState } from '../../context/appState';

export default function CodeEditor() {
  const { state: appState, dispatch: appDispatch } = useAppState();
  const { headers, variables, endpoint, queryString, outputQueryData } =
    appState;

  const [error, setError] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [isOpenSchema, setIsOpenSchema] = useState<boolean>(false);

  useEffect(() => {
    const getSchema = async () => {
      const requestHeaders = createHeadersOfRequest('');
      const query = getIntrospectionQuery();
      const requestBody = createBodyOfRequest('', query);

      const schemaData = await makeRequest(
        endpoint,
        requestHeaders,
        requestBody
      );

      const clientSchema = buildClientSchema(schemaData.data);
      setSchema(clientSchema);
    };

    getSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGraphQlResponse() {
    try {
      const requestHeaders = createHeadersOfRequest(headers);
      const requestBody = createBodyOfRequest(variables, queryString);
      const data = await makeRequest(endpoint, requestHeaders, requestBody);

      appDispatch({
        type: AppStateActions.SET_QUERY_DATA,
        payload: JSON.stringify(data),
      });
    } catch (err) {
      if (err instanceof Error) {
        const newErrorMsg = `Error ${err.message}`;
        appDispatch({
          type: AppStateActions.SET_QUERY_DATA,
          payload: JSON.stringify(newErrorMsg),
        });
      }
    }
  }

  return (
    <PageWrapper>
      <div className="w-full bg-fuchsia-900 p-5">
        <input
          value={endpoint}
          onChange={(event) => {
            appDispatch({
              type: AppStateActions.SET_ENDPOINT,
              payload: event.target.value,
            });
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
              appDispatch({
                type: AppStateActions.PRETTIFY,
                payload: '',
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
              value={queryString}
              extensions={[graphql(schema), EditorView.lineWrapping]}
              onChange={(event) =>
                appDispatch({
                  type: AppStateActions.SET_QUERY_STRING,
                  payload: event,
                })
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
              outputQueryData
                ? JSON.stringify(JSON.parse(outputQueryData), null, 2)
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

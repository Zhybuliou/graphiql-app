import React from 'react';
import Params from '../params/Params';
import { IconPlay } from '../ui/icons/IconPlay';
import { IconSparkles } from '../ui/icons/IconSparkles';
import UiButton from '../ui/UiButton';
import RequestEditor from './RequestEditor';
import CodeViewer from './CodeViewer';
import { usePlayground } from './usePlayground';
import PlaygroundLayout from './PlaygroundLayout';
import SchemaViewer from '../schemaViewer/SchemaViewer';
import EndpointInput from './EndpointInput';

export default function Playground() {
  const {
    endpoint,
    schema,
    headers,
    variables,
    queryString,
    response,
    error,
    setEndpoint,
    setHeaders,
    setVariables,
    setQueryString,
    prettify,
    executeQuery,
  } = usePlayground();

  return (
    <>
      <PlaygroundLayout
        controls={
          <>
            <UiButton
              type="button"
              onClick={prettify}
              title="Prettify"
              className="p-2"
            >
              <IconSparkles className="w-4 h-4" />
            </UiButton>
            <EndpointInput endpoint={endpoint} setEndpoint={setEndpoint} />
          </>
        }
        buttonExecute={
          <UiButton
            type="button"
            onClick={executeQuery}
            className="p-2 rounded-full"
            title="Execute query"
          >
            <IconPlay className="w-10 h-10" />
          </UiButton>
        }
        requestEditor={
          <RequestEditor
            schema={schema}
            setQueryString={setQueryString}
            queryString={queryString}
            params={
              <Params
                headers={headers}
                variables={variables}
                setVariables={setVariables}
                setHeaders={setHeaders}
              />
            }
          />
        }
        codeViewer={<CodeViewer value={response} error={error} />}
      />
      {schema && <SchemaViewer schema={schema} />}
    </>
  );
}

import React from 'react';
import Params from '../params/Params';
import { IconPlay } from '../ui/icons/IconPlay';
import { IconSparkles } from '../ui/icons/IconSparkles';
import Button from '../ui/Button';
import RequestEditor from './RequestEditor';
import CodeViewer from './CodeViewer';
import { usePlayground } from './usePlayground';
import PlaygroundLayout from './PlaygroundLayout';

export default function Playground() {
  const {
    endpoint,
    schema,
    headers,
    variables,
    queryString,
    response,
    error,
    changeEndpoint,
    setHeaders,
    setVariables,
    setQueryString,
    prettify,
    executeQuery,
  } = usePlayground();

  return (
    <PlaygroundLayout
      controls={
        <>
          <Button
            type="button"
            onClick={prettify}
            title="Prettify"
            className="p-2"
          >
            <IconSparkles className="w-4 h-4" />
          </Button>
          <input
            value={endpoint}
            onChange={(event) => changeEndpoint(event.target.value)}
            className="w-full"
            type="text"
          />
        </>
      }
      buttonExecute={
        <Button
          type="button"
          onClick={executeQuery}
          className="p-2"
          title="Execute query"
        >
          <IconPlay className="w-8 h-8" />
        </Button>
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
  );
}

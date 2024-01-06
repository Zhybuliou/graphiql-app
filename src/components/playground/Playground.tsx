import React, { lazy, Suspense } from 'react';
import { Params } from './Params';
import { IconPlay } from '../ui/icons/IconPlay';
import { IconSparkles } from '../ui/icons/IconSparkles';
import { UiButton } from '../ui/UiButton';
import { RequestEditor } from './editors/RequestEditor';
import { ResponseEditor } from './editors/ResponseEditor';
import { usePlayground } from './usePlayground';
import { PlaygroundLayout } from './PlaygroundLayout';
import { EndpointInput } from './EndpointInput';

export function Playground() {
  const {
    endpoint,
    schema,
    headers,
    variables,
    queryString,
    response,
    error,
    isLoading,
    isOpenSchema,
    setIsOpenSchema,
    setEndpoint,
    setHeaders,
    setVariables,
    setQueryString,
    prettify,
    executeQuery,
  } = usePlayground();

  const SchemaViewer = lazy(() => import('../schemaViewer/SchemaViewer'));

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
            <UiButton
              type="button"
              onClick={() => setIsOpenSchema((o) => !o)}
              disabled={!schema}
              title="Schema"
              className="p-2 bg-red-600 hover:bg-red-500"
              data-testid="schema-button"
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
            className="p-2 bg-red-600 rounded-full hover:bg-red-500"
            title="Execute query"
            disabled={isLoading || !schema}
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
        responseEditor={
          <ResponseEditor
            value={response}
            error={error}
            isLoading={isLoading}
          />
        }
      />

      {schema && isOpenSchema && (
        <Suspense fallback={<p>Loading...</p>}>
          <SchemaViewer
            schema={schema}
            isOpen={isOpenSchema}
            setIsOpen={setIsOpenSchema}
          />
        </Suspense>
      )}
    </>
  );
}

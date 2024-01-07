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
import { IconSchema } from '../ui/icons/IconSchema';
import { useLocale } from '../../context/local';

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

  const { state } = useLocale();

  const SchemaViewer = lazy(() => import('../schemaViewer/SchemaViewer'));

  return (
    <PlaygroundLayout
      controls={
        <>
          <UiButton
            type="button"
            onClick={prettify}
            title={state.strings.playgroundButtonPrettifyTitle}
            className="p-2"
          >
            <IconSparkles className="w-4 h-4" />
          </UiButton>
          <UiButton
            type="button"
            onClick={() => setIsOpenSchema((o) => !o)}
            disabled={!schema}
            title={state.strings.playgroundButtonSchemaTitle}
            className="p-2"
            data-testid="schema-button"
          >
            <IconSchema className="w-4 h-4" />
          </UiButton>
          <UiButton
            type="button"
            onClick={executeQuery}
            className="p-2 bg-red-500 rounded-full hover:bg-red-600"
            title={state.strings.playgroundButtonExecuteTitle}
            disabled={isLoading || !schema}
          >
            <IconPlay className="w-4 h-4" />
          </UiButton>
          <EndpointInput endpoint={endpoint} setEndpoint={setEndpoint} />
        </>
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
        <ResponseEditor value={response} error={error} isLoading={isLoading} />
      }
      schemaViewer={
        schema &&
        isOpenSchema && (
          <Suspense
            fallback={
              <p className="absolute right-px top-0 z-20">
                {state.strings.playgroundIsLoading}
              </p>
            }
          >
            <SchemaViewer
              schema={schema}
              isOpen={isOpenSchema}
              setIsOpen={setIsOpenSchema}
            />
          </Suspense>
        )
      }
    />
  );
}

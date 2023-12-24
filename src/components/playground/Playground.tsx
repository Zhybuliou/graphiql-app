import React, { useState } from 'react';
import Params from '../params/Params';
import { IconPlay } from '../ui/icons/IconPlay';
import { IconSparkles } from '../ui/icons/IconSparkles';
import Schema from '../schema/Schema';
import Button from '../ui/Button';
import RequestEditor from './RequestEditor';
import CodeViewer from './CodeViewer';
import { usePlayground } from './usePlayground';

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
    getGraphQlResponse,
  } = usePlayground();

  const [isOpenSchema, setIsOpenSchema] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-56px)]">
      <div className="w-full flex items-center justify-center gap-4 bg-fuchsia-900 p-5">
        <Button
          type="button"
          onClick={prettify}
          title="Prettify"
          className="p-2"
        >
          <IconSparkles className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => setIsOpenSchema((o) => !o)}
          title="Schema"
          className="p-2 text-xs"
        >
          Sch
        </Button>
        <input
          value={endpoint}
          onChange={(event) => changeEndpoint(event.target.value)}
          className="w-full"
          type="text"
        />
      </div>
      <div className="flex w-full h-full relative">
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
        <div className="absolute z-10 flex justify-center w-full top-6">
          <Button
            type="button"
            onClick={getGraphQlResponse}
            className="p-2"
            title="Execute query"
          >
            <IconPlay className="w-8 h-8" />
          </Button>
        </div>

        <CodeViewer value={response} error={error} />
      </div>

      {isOpenSchema && <Schema clientSchema={schema} />}
    </div>
  );
}

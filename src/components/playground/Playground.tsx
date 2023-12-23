import React, { useState } from 'react';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import { IconPlay } from '../ui/icons/IconPlay';
import { IconSparkles } from '../ui/icons/IconSparkles';
import Schema from '../schema/Schema';
import PageWrapper from '../ui/PageWrapper';
import Button from '../ui/Button';
import RequestEditor from './RequestEditor';
import ResponseEditor from './ResponseEditor';
import { usePlayground } from './usePlayground';

export default function Playground() {
  const {
    changeEndpointUrl,
    prettify,
    getGraphQlResponse,
    setQueryString,
    schema,
    endpoint,
    response,
    error,
    queryString,
  } = usePlayground();

  const [isOpenSchema, setIsOpenSchema] = useState<boolean>(false);

  return (
    <PageWrapper>
      <div className="w-full bg-fuchsia-900 p-5">
        <input
          value={endpoint}
          onChange={(event) => changeEndpointUrl(event.target.value)}
          className="w-full p-1 mb-5"
          type="text"
        />
        <div className="flex items-center justify-center gap-2.5">
          <Button type="button" onClick={getGraphQlResponse}>
            <IconPlay />
          </Button>
          <Button type="button" onClick={prettify}>
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
        <RequestEditor
          schema={schema}
          setQueryString={setQueryString}
          queryString={queryString}
        />
        <ResponseEditor response={response} error={error} />
      </div>
      <ParamsEditor />
      {isOpenSchema && <Schema clientSchema={schema} />}
    </PageWrapper>
  );
}

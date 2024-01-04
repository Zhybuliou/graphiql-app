import React, { useState } from 'react';
import { UiButton } from '../ui/UiButton';
import { tempFetch } from '../../utils/tempFetch';

export interface IDataFromFetch {
  name: string;
  id: string;
  status?: string;
}

export interface IDataState {
  variables: string;
  query: string;
  endpoint: string;
  info?: IDataFromFetch[];
}

function GraphQLTest() {
  const [data, setData] = useState<IDataState>({
    variables: '',
    query: '',
    endpoint: '',
  });

  const handleTestButton = () => {
    tempFetch(data.endpoint, data.query, data.variables);
  };

  const handleChangeVariables = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setData({ ...data, variables: value });
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setData({ ...data, query: value });
  };

  const handleChangeEndpoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData({ ...data, endpoint: value });
  };
  return (
    <div className="my-4 flex content-center items-center gap-3">
      <UiButton type="button" onClick={handleTestButton}>
        Go
      </UiButton>
      <input
        className="border-2 border-cyan-400 rounded"
        type="text"
        placeholder="endPoint"
        onChange={handleChangeEndpoint}
      />
      <div>
        <h3 className="bg-cyan-400">Variables </h3>
        <textarea
          className="border-4 border-cyan-400 rounded my-4 "
          name="variables-area"
          cols={40}
          rows={10}
          onChange={handleChangeVariables}
        />
      </div>
      <div>
        <h3 className="bg-cyan-400">Query </h3>
        <textarea
          className="border-4 border-cyan-400 rounded my-4 "
          name="variables-area"
          cols={40}
          rows={10}
          onChange={handleChangeQuery}
        />
      </div>
    </div>
  );
}

export default GraphQLTest;

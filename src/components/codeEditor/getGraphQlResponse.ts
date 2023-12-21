import RequestOptions from '../../types/enums/requestOptions';
import checkRequestParams from './checkRequestParams';

const getGraphQlResponse = async (
  query: string,
  url: string,
  headersString: string,
  variablesString: string,
  saveParams: React.Dispatch<{
    type: string;
    payload: string;
  }>
) => {
  const body = checkRequestParams(
    RequestOptions.VARIABLES,
    headersString,
    variablesString,
    saveParams,
    query
  );
  const headers = checkRequestParams(
    RequestOptions.HEADERS,
    headersString,
    variablesString,
    saveParams
  );

  if (body && headers) {
    const result = await fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then((res) => res.json())
      .catch((err) => err);
    saveParams({ type: 'SET_QUERY_DATA', payload: JSON.stringify(result) });
  }
};

export default getGraphQlResponse;

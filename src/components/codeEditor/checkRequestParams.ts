import RequestOptions from '../../types/enums/requestOptions';

const checkRequestParams = (
  paramType: RequestOptions,
  headers: string,
  variables: string,
  saveParams: React.Dispatch<{
    type: string;
    payload: string;
  }>,
  query?: string
) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const param = paramType === RequestOptions.VARIABLES ? variables : headers;

  if (param) {
    try {
      const parsedParam = JSON.parse(param);
      if (parsedParam && typeof parsedParam === 'object') {
        return paramType === RequestOptions.VARIABLES
          ? JSON.stringify({ query, variables: parsedParam })
          : { ...parsedParam, ...defaultHeaders };
      }
    } catch (er) {
      if (er instanceof Error) {
        const newErrorMsg = `${paramType} are written incorrectly ${er.message}`;
        saveParams({ type: 'SET_QUERY_DATA', payload: newErrorMsg });
      }
      return null;
    }
  }

  return paramType === RequestOptions.VARIABLES
    ? JSON.stringify({ query })
    : defaultHeaders;
};
export default checkRequestParams;

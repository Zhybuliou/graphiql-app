const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip',
};
export function createHeadersOfRequest(headers: string) {
  if (!headers) {
    return DEFAULT_HEADERS;
  }
  const parsedHeaders = JSON.parse(headers);
  return { ...parsedHeaders, ...DEFAULT_HEADERS };
}

export async function makeRequest(
  endpoint: string,
  headers: Record<string, string>,
  body: string
) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body,
  });
  return response.json();
}

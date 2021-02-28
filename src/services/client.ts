import { apiAddress, apiKey } from 'config';

export async function client(
  endpoint: string,
  query: string,
  { headers: customHeaders, ...customConfig }: RequestInit,
): Promise<Response> {
  const config = {
    method: 'GET',
    headers: {
      ...customHeaders,
    },
    ...customConfig,
  };

  const response = await fetch(`${apiAddress}/${endpoint}?api_key=${apiKey}&${query}`, config);
  const json = await response.json()
  if (!response.ok) {
    throw new Error('Failed fetch');
  } else if (response.status >= 400) {
    throw new Error(json?.status_message as string);
  }
  
  return json;
}

client.get = (endpoint: string, query: string, config: RequestInit) => {
  return client(endpoint, query, { ...config, method: 'GET' });
};
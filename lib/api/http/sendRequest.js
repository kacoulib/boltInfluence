import 'isomorphic-unfetch';
import getRootUrl from './getRootUrl';

export default async function sendRequest(path, options = {}) {
  const headers = Object.assign({}, options.headers || {}, {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  const response = await fetch(
    `${getRootUrl()}${path}`,
    Object.assign({ method: 'POST', credentials: 'include',  }, options, { headers }),
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

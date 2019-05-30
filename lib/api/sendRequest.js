import 'isomorphic-unfetch';
import getRootUrl from './getRootUrl';

export default async function sendRequest(path, options = {}) {
  const headers = Object.assign({}, options.headers || {}, {
    'Content-type': 'application/json; charset=UTF-8',
  });

  const response = await fetch(
    `${getRootUrl()}${path}`,
    Object.assign({ method: 'POST', credentials: 'include' }, options, { headers }),
  );
  console.log(response)
  const data = await response.json();

  if (data.error) {
    console.log('err')
    throw new Error(data.error);
  }
  console.log(data)

  return data;
}

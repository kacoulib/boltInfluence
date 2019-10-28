import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/admin';

export const addArticle = ({ title, content, picture }) =>
  sendRequest(`${BASE_PATH}/articles`, {
    body: JSON.stringify({ title, content, picture }),
  });
export const getArticles = () =>
  sendRequest(`${BASE_PATH}/articles`, {
    method: 'GET',
    query: { a: 1, b: 2 }
  });
export const editArticle = ({
  slug, title, content, picture
}) =>
  sendRequest(`${BASE_PATH}/articles/${slug}`, {
    method: 'PUT',
    body: JSON.stringify({
      slug, title, picture, content
    }),
  });

export const getInfluencerList = () =>
  sendRequest(`${BASE_PATH}/influencers`, {
    method: 'GET',
  });
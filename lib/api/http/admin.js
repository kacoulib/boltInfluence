import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/admin';

export const getBookList = () =>
  sendRequest(`${BASE_PATH}/books`, {
    method: 'GET',
  });

export const addBook = ({ name, price, githubRepo }) =>
  sendRequest(`${BASE_PATH}/books/add`, {
    body: JSON.stringify({ name, price, githubRepo }),
  });

export const addArticle = ({ title, content }) =>
  sendRequest(`${BASE_PATH}/articles`, {
    body: JSON.stringify({ title, content }),
  });
export const getArticles = () =>
  sendRequest(`${BASE_PATH}/articles`, {
    method: 'GET',
    query: { a: 1, b: 2 }
  });
export const editArticle = ({
  slug, title, content
}) =>
  sendRequest(`${BASE_PATH}/articles/${slug}`, {
    method: 'PUT',
    body: JSON.stringify({
      slug, title, content
    }),
  });

export const editBook = ({
  id, name, price, githubRepo,
}) =>
  sendRequest(`${BASE_PATH}/books/edit`, {
    body: JSON.stringify({
      id,
      name,
      price,
      githubRepo,
    }),
  });

export const getBookDetail = ({ slug }) =>
  sendRequest(`${BASE_PATH}/books/detail/${slug}`, {
    method: 'GET',
  });

// github methods

export const syncBookContent = ({ bookId }) =>
  sendRequest(`${BASE_PATH}/books/sync-content`, {
    body: JSON.stringify({ bookId }),
  });

export const getGithubRepos = () =>
  sendRequest(`${BASE_PATH}/github/repos`, {
    method: 'GET',
  });

export const getInfluencerList = () =>
  sendRequest(`${BASE_PATH}/influencers`, {
    method: 'GET',
  });
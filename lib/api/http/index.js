import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1';

export const getBookList = () =>
    sendRequest(`${BASE_PATH}/books`, {
        method: 'GET',
    });

export const customRequest = ({ state, path, method = 'GET' }) => {
    const params = { method }
    if (method == 'POST' || method == 'PUT')
        params.body = JSON.stringify(state)

    return sendRequest(`${BASE_PATH}${path}`, params);
}
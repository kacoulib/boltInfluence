import sendRequest from '../sendRequest';

const BASE_PATH = '/api/v1/influencer';

export const getCampagns = () =>
    sendRequest(`${BASE_PATH}/campaigns`, {
        method: 'GET',
        query: { a: 1, b: 2 }
    });

export const getCampagn = (slug) =>
    sendRequest(`${BASE_PATH}/campaign/${slug}`, {
        method: 'GET',
        query: { a: 1, b: 2 }
    });
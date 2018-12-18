import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const API_ROOT = 'http://localhost:2000/api';
const superagent = superagentPromise(_superagent, global.Promise);
const responseBody = response => response.body;

export const requests = {
    get: (url) =>
        superagent.get(`${API_ROOT}${url}`).then(responseBody),
    post: (url, body = null) =>
        superagent.post(`${API_ROOT}${url}`, body).then(responseBody)

};
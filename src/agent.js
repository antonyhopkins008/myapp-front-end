import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const API_ROOT = 'http://localhost:2000/api';
const superagent = superagentPromise(_superagent, global.Promise);
const responseBody = response => response.body;

let token = null;

const tokenPlugin = secured => {
    return (request) => {
        if (token && secured) {
            request.set('Authorization', `Bearer ${token}`)
        }
    };
};

export const requests = {
    get: (url, secured = false) => {
        return superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin(secured))
            .then(responseBody)
    },

    post: (url, body = null, secured = true) => {
        return superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin(secured))
            .then(responseBody);
    },

    upload: (url, file,  secured = true) => {
        return superagent
            .post(`${API_ROOT}${url}`).attach('file', file)
            .use(tokenPlugin(secured))
            .then(responseBody)
    },

    delete: (url, id, secured = true) => {
        return superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin(secured))
            .then(responseBody)
    },

    setToken: (newJwtToken) => token = newJwtToken
};
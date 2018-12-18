import {USER_LOGIN_SUCCESS} from "./actions/constants";
import {requests} from "./agent";

export const tokenMiddleware = store => next => action => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            window.localStorage.setItem('jwtToken', action.token);
            requests.setToken(action.token);
            break;
        default:

    }
    next(action);
};
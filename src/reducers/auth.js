import {USER_LOGIN_SUCCESS} from "../actions/constants";

export default (state = {
    token: null,
}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
            };
        default:
            return state
    }
}
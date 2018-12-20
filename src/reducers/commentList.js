import {
    COMMENT_ADDED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECEIVE,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_UNLOAD
} from "../actions/constants";

export default (state = {
    comments: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case COMMENT_LIST_RECEIVE:
            return {
                ...state,
                comments: action.data['hydra:member'],
                isFetching: false
            };
        case COMMENT_ADDED:
            return {
                comments: [action.comment, ...state.comments]
            };
        case COMMENT_LIST_ERROR:
        case COMMENT_LIST_UNLOAD:
            return {
                ...state,
                comments: null,
                isFetching: false
            };
        default:
            return state
    }
}
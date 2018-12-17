import {
    BLOG_POST_LIST_ADD,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVE,
    BLOG_POST_LIST_REQUEST
} from "../actions/actions";

export default (state = {
    posts: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case BLOG_POST_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case BLOG_POST_LIST_RECEIVE:
            return {
                ...state,
                posts: action.data['hydra:member'],
                isFetching: false
            };
        case BLOG_POST_LIST_ERROR:
            return {
                ...state,
                posts: null,
                isFetching: false
            };
        case BLOG_POST_LIST_ADD:
            return {
                ...state,
                posts: state.posts ? state.posts.concat(action.data) : state.posts
            };
        default:
            return {
                state,
            }
    }
}
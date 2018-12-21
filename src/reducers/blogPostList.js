import {
    BLOG_POST_LIST_ADD,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVE,
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_LIST_SET_PAGE
} from "../actions/constants";
import {pageCount} from "../apiUtils";

export default (state = {
    posts: null,
    isFetching: true,
    currentPage: 1,
    pageCount: null
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
                pageCount: pageCount(action.data),
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
        case BLOG_POST_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        default:
            return state
    }
}
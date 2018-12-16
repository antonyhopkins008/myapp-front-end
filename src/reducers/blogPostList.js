import {ADD_BLOG_POST_LIST, BLOG_POST_LIST} from "../actions/actions";

export default (state = {
    posts: null
}, action) => {
    switch (action.type) {
        case BLOG_POST_LIST:
            return {
                ...state,
                posts: action.data
            };
        case ADD_BLOG_POST_LIST:
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
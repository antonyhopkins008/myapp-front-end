import {requests} from "../agent";

import {
    BLOG_POST_ERROR,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVE,
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_RECEIVE,
    BLOG_POST_REQUEST,
    BLOG_POST_UNLOAD,
} from "./constants";

export const blogPostListRequest = () => ({
    type: BLOG_POST_LIST_REQUEST,
});
export const blogPostListError = (error) => ({
    type: BLOG_POST_LIST_ERROR,
    error
});
export const blogPostListReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVE,
    data
});
export const blogPostRequest = () => ({
    type: BLOG_POST_REQUEST,
});
export const blogPostError = (error) => ({
    type: BLOG_POST_ERROR,
    error
});
export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVE,
    data
});
export const blogPostUnload = (data) => ({
    type: BLOG_POST_UNLOAD,
    data
});
export const blogPostListFetch = () => {
    return (dispatch) => {
        dispatch(blogPostListRequest());

        return requests
            .get('/blog_posts')
            .then(response => dispatch(blogPostListReceived(response)))
            .catch(error => dispatch(blogPostListError(error)));
    }
};
export const blogPostFetch = (id) => {
    return (dispatch) => {
        dispatch(blogPostRequest());

        return requests
            .get(`/blog_posts/${id}`)
            .then(response => dispatch(blogPostReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
};
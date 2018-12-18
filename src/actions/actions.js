import {requests} from "../agent";

import {
    BLOG_POST_ERROR,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVE,
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_RECEIVE,
    BLOG_POST_REQUEST,
    BLOG_POST_UNLOAD,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECEIVE,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_UNLOAD,
    USER_LOGIN_SUCCESS,
} from "./constants";
import {SubmissionError} from "redux-form";

/**
 * Blog post list
 */
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
export const blogPostListFetch = () => {
    return (dispatch) => {
        dispatch(blogPostListRequest());

        return requests
            .get('/blog_posts')
            .then(response => dispatch(blogPostListReceived(response)))
            .catch(error => dispatch(blogPostListError(error)));
    }
};

/**
 * Blog post
 */
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
export const blogPostFetch = (id) => {
    return (dispatch) => {
        dispatch(blogPostRequest());

        return requests
            .get(`/blog_posts/${id}`)
            .then(response => dispatch(blogPostReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
};

/**
 * Blog post comment
 */
export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST,
});
export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    error
});
export const commentListReceived = (data) => ({
    type: COMMENT_LIST_RECEIVE,
    data
});
export const commentListUnload = (data) => ({
    type: COMMENT_LIST_UNLOAD,
    data
});
export const commentListFetch = (id) => {
    return (dispatch) => {
        dispatch(commentListRequest());

        return requests
            .get(`/blog_posts/${id}/comments`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)));
    }
};

export const userLoginSuccess = (token) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token
    }
};

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests
            .post('/login_check', {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token)))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Username or password is invalid'
                });
            });
    }
};

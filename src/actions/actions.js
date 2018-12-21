import {requests} from "../agent";

import {
    BLOG_POST_ERROR,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVE,
    BLOG_POST_LIST_REQUEST, BLOG_POST_LIST_SET_PAGE,
    BLOG_POST_RECEIVE,
    BLOG_POST_REQUEST,
    BLOG_POST_UNLOAD,
    COMMENT_ADDED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECEIVE,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_UNLOAD,
    USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST,
    USER_SET_ID,
} from "./constants";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";

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

export const blogPostListSetPage = (page) => ({
    type: BLOG_POST_LIST_SET_PAGE,
    page
});

export const blogPostListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(blogPostListRequest());
        return requests
            .get(`/blog_posts?_page=${page}`)
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

export const commentListFetch = (id, page=1) => {
    return (dispatch) => {
        dispatch(commentListRequest());
        return requests
            .get(`/blog_posts/${id}/comments?_page=${page}`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)));
    }
};

export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment
});

export const commentAdd = (comment, blogPostId) => {
    return (dispatch) => {
        return requests
            .post(
                '/comments',
                {
                    content: comment,
                    blogPost: `/api/blog_posts/${blogPostId}`
                }
            ).then(response => dispatch(commentAdded(response)))
            .catch(error => {
                if (401 === error.response.status) {
                    return dispatch(userLogout());
                }
                throw new SubmissionError(parseApiErrors(error.response))
            })
    }
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
};

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    }
};

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests
            .post('/login_check', {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token, response.id)))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Username or password is invalid'
                });
            });
    }
};

export const userRegister = (username, password, retypedPassword, email, name) => {
    return (dispatch) => {
        return requests
            .post('/users', {username, password, retypedPassword, email, name}, false)
            .catch(error => {
                throw new SubmissionError(parseApiErrors(error.response));
            });
    }
};

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
    }
};

export const userProfileRequest = () => {
    return {
        type: USER_PROFILE_REQUEST,
    }
};

export const userProfileError = (userId) => {
    return {
        type: USER_PROFILE_ERROR,
        userId
    }
};

export const userProfileReceived = (userId, userData) => {
    return {
        type: USER_PROFILE_RECEIVED,
        userData,
        userId
    }
};

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests
            .get(`/users/${userId}`, true)
            .then(response => dispatch(userProfileReceived(userId, response)))
            .catch(error => dispatch(userProfileError(userId)))
    }
};

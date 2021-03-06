import {requests} from "../agent";

import {
    BLOG_POST_ERROR, BLOG_POST_IMAGE_UNLOAD,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVE,
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_LIST_SET_PAGE,
    BLOG_POST_RECEIVE,
    BLOG_POST_REQUEST,
    BLOG_POST_UNLOAD,
    COMMENT_ADDED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECEIVE,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_UNLOAD, IMAGE_DELETE_REQUEST, IMAGE_DELETED,
    IMAGE_UPLOAD_ERROR,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOADED,
    USER_CONFIRMATION_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST,
    USER_REGISTER_COMPLETE,
    USER_REGISTRATION_SUCCESS,
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

export const blogPostAdd = (title, content, images = []) => {
    return (dispatch) => {
        return requests
            .post(
                '/blog_posts',
                {
                    title,
                    content,
                    slug: title && title.replace(/ /g, '-').toLowerCase(),
                    images: images.map(image => `/api/images/${image.id}`)
                }
            ).catch(error => {
                if (401 === error.response.status) {
                    return dispatch(userLogout());
                } else if (403 === error.response.status) {
                    throw new SubmissionError({
                        _error: 'You do not have rights to publish new blog post'
                    })
                }
                throw new SubmissionError(parseApiErrors(error.response))
            })
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

export const userRegistrationSuccess = () => {
    return {
        type: USER_REGISTRATION_SUCCESS
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
            .then(() => dispatch(userRegistrationSuccess()))
            .catch(error => {
                throw new SubmissionError(parseApiErrors(error.response));
            });
    }
};

export const userRegisterComplete = () => {
    return {
        type: USER_REGISTER_COMPLETE
    }
};

export const userConfirm = (confirmationToken) => {
    return (dispatch) => {
        return requests
            .post('/users/confirm', {confirmationToken}, false)
            .then(() => dispatch(userConfirmationSuccess()))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Confirmation token is invalid'
                });
            });
    }
};

export const userConfirmationSuccess = () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
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

export const imageUploaded = (file) => {
    return {
        type: IMAGE_UPLOADED,
        image: file
    }
};

export const imageUploadError = () => {
    return {
        type: IMAGE_UPLOAD_ERROR,
    }
};

export const imageUploadRequest = () => {
    return {
        type: IMAGE_UPLOAD_REQUEST,
    }
};

export const imageUpload = (file) => {
    return (dispatch) => {
        dispatch(imageUploadRequest());
        return requests
            .upload('/images', file)
            .then(response => dispatch(imageUploaded(response)))
            .catch(error => dispatch(imageUploadError));

    }
};

export const blogPostImageUnload = () => ({
    type: BLOG_POST_IMAGE_UNLOAD
});

export const imageDeleteRequest = () => {
    console.log('image delete request')
    return {
        type: IMAGE_DELETE_REQUEST,
    }
};


export const imageDelete = (id) => {
    console.log('action...');
    return (dispatch) => {
        dispatch(imageDeleteRequest());
        return requests
            .delete(`/images/${id}`)
            .then(dispatch(imageDeleted(id)))
    }
};

export const imageDeleted = (id) => {
    return {
        type: IMAGE_DELETED,
        imageId: id
    }
};

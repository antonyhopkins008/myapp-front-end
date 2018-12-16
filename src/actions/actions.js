export const BLOG_POST_LIST = 'BLOG_POST_LIST';
export const ADD_BLOG_POST_LIST = 'ADD_BLOG_POST_LIST';

export const blogPostList = () => ({
    type: BLOG_POST_LIST,
    data: [
        {
            id: 1,
            title: 'Hello'
        },
        {
            id: 2,
            title: 'Something other'
        },
    ]
});

export const blogPostListAdd = () => ({
    type: ADD_BLOG_POST_LIST,
    data: {
        id: Math.floor(Math.random() * 100 + 3),
        title: 'New blog post'
    }
});
export const parseApiErrors = (error) => {
    return error.body.violations.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        },
        {}
    )
};

export const pageCount = (collection) => {
    if (!collection['hydra:view']) {
        return 1;
    }

    return Number(
        collection['hydra:view']['hydra:last'].match(/page=(\d+)/)[1]
    );
};

const canWriteNewBlogPostRoles = ['ROLE_WRITER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'];

export const canWriteBlogPost = (userData) => {
    return null !== userData &&
        userData.roles.some(
            userRoles => canWriteNewBlogPostRoles.includes(userRoles)
        )
};
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
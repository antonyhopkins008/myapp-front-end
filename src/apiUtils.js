export const parseApiErrors = (error) => {
    return error.body.violations.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        },
        {}
    )
};
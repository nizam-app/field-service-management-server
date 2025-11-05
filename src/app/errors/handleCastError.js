const handleCastError = (err) => {
    const statusCode = 400;
    const errorSource = [
        {
            path: err.path,
            message: `Invalid ${err.path}`,
        },
    ];
    return {
        statusCode,
        message: 'Invalid ID',
        errorSource,
    };
};
export default handleCastError;
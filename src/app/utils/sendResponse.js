const sendResponse = (res, data) => {
    res.json({
        success: true,
        statusCode: data.statusCode,
        message: data.message,
        accessToken: data.accessToken,
        meta: data.meta,
        data: data.data,
    });
};
export default sendResponse;
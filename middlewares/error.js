module.exports = (err, _req, res, _next) => {
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    if (err.fileValidationError) {
        return res.status(401).json({
            message: err.message,
        });
    }
};

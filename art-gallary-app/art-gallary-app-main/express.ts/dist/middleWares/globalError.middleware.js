"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const apiError_1 = require("./../utils/apiError");
const jwtInvalidSigniture = () => new apiError_1.ApiError("Invalid token Please login again!", 401);
const TokenExpiredError = () => new apiError_1.ApiError("Expired token Please login again!", 401);
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendErrorForDevelopment(res, err);
    }
    else {
        if (err.name === "JsonWebTokenError") {
            err = jwtInvalidSigniture();
            return;
        }
        ;
        if (err.name === "TokenExpiredError") {
            err = TokenExpiredError();
            return;
        }
        ;
        sendErrorForProduction(res, err);
    }
};
exports.globalError = globalError;
const sendErrorForDevelopment = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack
    });
};
const sendErrorForProduction = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
//# sourceMappingURL=globalError.middleware.js.map
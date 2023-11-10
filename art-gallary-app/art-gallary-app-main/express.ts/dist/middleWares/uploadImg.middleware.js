"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const apiError_1 = require("../utils/apiError");
const multerOption = () => {
    const multerStorage = multer_1.default.memoryStorage();
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            cb(new apiError_1.ApiError("suported only image", 400), false);
        }
    };
    const uploads = (0, multer_1.default)({ storage: multerStorage, fileFilter: multerFilter });
    return uploads;
};
const uploadImage = (fieldName) => {
    return multerOption().single(fieldName);
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=uploadImg.middleware.js.map
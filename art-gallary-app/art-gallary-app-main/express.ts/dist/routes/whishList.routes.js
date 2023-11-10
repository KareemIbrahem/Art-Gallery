"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const whishList_controller_1 = require("../controllers/whishList.controller");
const whishList_validation_1 = require("../utils/validation/whishList.validation");
exports.router = express_1.default.Router();
exports.router.use(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user"));
exports.router.post("/", whishList_validation_1.addProductToWhishListValidation, whishList_controller_1.addToWhishList);
exports.router.delete("/:productId", whishList_validation_1.deleteProductFromWhishListValidation, whishList_controller_1.deleteFromUserWhishList);
//# sourceMappingURL=whishList.routes.js.map
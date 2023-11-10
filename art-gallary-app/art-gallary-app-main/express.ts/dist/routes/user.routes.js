"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_validate_1 = require("../utils/validation/user.validate");
const auth_controller_1 = require("../controllers/auth.controller");
const loggedUser_controller_1 = require("../controllers/loggedUser.controller");
exports.router = express_1.default.Router();
exports.router.use(auth_controller_1.auth);
exports.router.get("/getloggeduser", loggedUser_controller_1.getLoggedUser, user_controller_1.getUser);
exports.router.patch("/updateloggeduser", user_controller_1.uploadImg, user_controller_1.userImgProccessing, user_validate_1.updateLoggedUservalidation, loggedUser_controller_1.updateLoggedUser);
exports.router.patch("/updateloggeduserpassword", user_validate_1.updateLoggedUserPasswordValidation, loggedUser_controller_1.updateLogedUserPassword);
exports.router.delete("/deleteloggeduser", loggedUser_controller_1.deleteLoggedUser, user_controller_1.deleteUser);
exports.router.use((0, auth_controller_1.allowedTo)("admin", "superAdmin"));
exports.router.patch("/changePassword/:id", user_validate_1.updateUserPasswordValidation, user_controller_1.updateUserPassword);
exports.router.route("/").post(user_controller_1.uploadImg, user_controller_1.userImgProccessing, user_validate_1.createUserValidation, user_controller_1.createUser).get(user_controller_1.getUsers);
exports.router
    .route("/:id")
    .get(user_validate_1.getUserValidation, user_controller_1.getUser)
    .patch(user_controller_1.uploadImg, user_controller_1.userImgProccessing, user_validate_1.updateUservalidation, user_controller_1.updateUser)
    .delete(user_validate_1.deleteUserValidation, user_controller_1.deleteUser);
//# sourceMappingURL=user.routes.js.map
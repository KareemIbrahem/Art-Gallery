"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const category_validation_1 = require("../utils/validation/category.validation");
const auth_controller_1 = require("../controllers/auth.controller");
exports.router = express_1.default.Router();
exports.router.get("/", category_controller_1.getCategories);
exports.router.get("/:id", category_validation_1.getCategoryValidation, category_controller_1.getCategory);
exports.router.use(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("admin", "superAdmin"));
exports.router.post("/", category_validation_1.createCategoryValidation, category_controller_1.createCategory);
exports.router
    .route("/:id")
    .patch(category_validation_1.updateCategoryValidation, category_controller_1.updateCategory)
    .delete(category_validation_1.deleteCategoryValidation, category_controller_1.deleteCategory);
//# sourceMappingURL=category.routes.js.map
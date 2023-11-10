"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "userName is required"],
        minlength: [5, "to short userName"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "user phone is required"]
    },
    userImg: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "user adress required"]
    },
    password: {
        type: String,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: "user"
    },
    changePasswordTime: {
        type: Date
    },
    resetPasswordCode: String,
    resetCodeExpire: Number,
    resetCodeVerify: Boolean,
    signUpResetCode: String,
    signUpResetCodeExpire: Number,
    signUpVerify: {
        type: Boolean,
        default: false
    },
    wishList: [{
            product: {
                type: mongoose_1.default.Schema.ObjectId,
                ref: "products"
            }
        }]
}, { timestamps: true });
const setImgUrl = (doc) => {
    if (doc.userImg) {
        const imgUrl = `${process.env.BASE_URL}/users/${doc.userImg}`;
        doc.userImg = imgUrl;
    }
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        try {
            this.password = yield bcryptjs_1.default.hash(this.password, 12);
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
userSchema.post("init", (doc) => {
    setImgUrl(doc);
});
userSchema.post("save", (doc) => {
    setImgUrl(doc);
});
userSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
exports.userModel = mongoose_1.default.model("users", userSchema);
//# sourceMappingURL=user.model.js.map
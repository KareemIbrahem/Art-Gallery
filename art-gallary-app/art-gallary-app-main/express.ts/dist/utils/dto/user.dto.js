"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUser = void 0;
const normalizeUser = (user) => {
    return {
        email: user.email,
        name: user.name,
        _id: user.id,
        role: user.role,
        phone: user.phone,
        userImg: user.userImg || "",
        address: user.address,
        wishList: user.wishList
    };
};
exports.normalizeUser = normalizeUser;
//# sourceMappingURL=user.dto.js.map
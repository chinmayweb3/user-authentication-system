"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
function generateClientSecretId(num) {
    if (num === void 0) { num = 16; }
    return (0, crypto_1.randomBytes)(num).toString("hex");
}
exports.default = generateClientSecretId;

"use strict";
exports.__esModule = true;
exports.Contact = void 0;
var mongoose_1 = require("mongoose");
var contactSchema = new mongoose_1.Schema({
    avatar: { type: String, require: true },
    name: { type: String, require: true },
    dob: { type: String, require: true },
    gender: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    website: { type: String, require: true },
    address: { type: String, require: true }
});
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);

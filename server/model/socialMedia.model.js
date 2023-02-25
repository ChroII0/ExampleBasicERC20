"use strict";
exports.__esModule = true;
exports.SocialMedia = void 0;
var mongoose_1 = require("mongoose");
var socialMediaSchema = new mongoose_1.Schema({
    github: { type: String, require: true },
    facebook: { type: String, require: true },
    instagram: { type: String, require: true }
});
exports.SocialMedia = (0, mongoose_1.model)('SocialMedia', socialMediaSchema);

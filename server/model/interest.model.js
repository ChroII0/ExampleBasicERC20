"use strict";
exports.__esModule = true;
exports.Interest = void 0;
var mongoose_1 = require("mongoose");
var interestSchema = new mongoose_1.Schema({
    content: { type: String, require: true }
});
exports.Interest = (0, mongoose_1.model)('Interest', interestSchema);

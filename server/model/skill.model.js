"use strict";
exports.__esModule = true;
exports.Skill = void 0;
var mongoose_1 = require("mongoose");
var skillSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    level: { type: String, require: true }
});
exports.Skill = (0, mongoose_1.model)('Skill', skillSchema);

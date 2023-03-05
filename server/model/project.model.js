"use strict";
exports.__esModule = true;
exports.Project = void 0;
var mongoose_1 = require("mongoose");
var projectSchema = new mongoose_1.Schema({
    type: { type: String, require: true },
    website: { type: String },
    description: { type: [String], require: true }
});
exports.Project = (0, mongoose_1.model)('Project', projectSchema);

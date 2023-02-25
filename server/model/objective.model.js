"use strict";
exports.__esModule = true;
exports.Objective = void 0;
var mongoose_1 = require("mongoose");
var objectiveSchema = new mongoose_1.Schema({
    content: { type: String, require: true }
});
exports.Objective = (0, mongoose_1.model)('Objective', objectiveSchema);

"use strict";
exports.__esModule = true;
exports.Education = void 0;
var mongoose_1 = require("mongoose");
var educationSchema = new mongoose_1.Schema({
    time: { type: String, require: true },
    isCollege: { type: Boolean, require: true },
    school: { type: String, require: true },
    academicPrograms: { type: String, require: true },
    GPA: { type: String }
});
exports.Education = (0, mongoose_1.model)('Education', educationSchema);

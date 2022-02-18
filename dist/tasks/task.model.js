"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    icon: { type: String, required: true },
    status: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
exports.default = (0, mongoose_1.model)("Task", taskSchema);

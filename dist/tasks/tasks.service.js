"use strict";
// src/items/items.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const task_model_1 = __importDefault(require("./task.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.find();
        return tasks;
    }
    catch (err) {
        console.log(err);
    }
});
exports.findAll = findAll;
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findById(new mongoose_1.default.Types.ObjectId(new mongoose_1.default.Types.ObjectId(id)));
        return task;
    }
    catch (err) {
        console.log(err);
    }
});
exports.findOne = findOne;
const create = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = yield task_model_1.default.create(newItem);
        return newTask;
    }
    catch (err) {
        console.log(err);
    }
});
exports.create = create;
const update = (id, itemUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield (0, exports.findOne)(id);
        if (!item) {
            return null;
        }
        const updateItem = yield task_model_1.default.updateOne({ _id: id }, { $set: itemUpdate }, { new: true });
        return updateItem;
    }
    catch (err) {
        console.log(err);
    }
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield (0, exports.findOne)(id);
        if (!item) {
            throw new Error("invalid Id");
        }
        const deleteTask = yield task_model_1.default.deleteOne({ _id: id });
        return deleteTask;
    }
    catch (err) {
        console.log(err);
    }
});
exports.remove = remove;

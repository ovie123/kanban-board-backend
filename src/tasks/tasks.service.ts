// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { BaseTask, Task } from "./task.interface";
import { Tasks } from "./tasks.interface";
import TaskModel from "./task.model";
import mongoose from "mongoose";

export const findAll = async () => {
  try {
    const tasks: Task[] | null = await TaskModel.find();
    return tasks;
  } catch (err) {
    console.log(err);
  }
};

export const findOne = async (id: string) => {
  try {
    const task: Task | null = await TaskModel.findById(
      new mongoose.Types.ObjectId(new mongoose.Types.ObjectId(id))
    );
    return task;
  } catch (err) {
    console.log(err);
  }
};

export const create = async (newItem: BaseTask) => {
  try {
    const newTask: Task = await TaskModel.create(newItem);
    return newTask;
  } catch (err) {
    console.log(err);
  }
};

export const update = async (id: string, itemUpdate: BaseTask) => {
  try {
    const item = await findOne(id);

    if (!item) {
      return null;
    }

    const updateItem: any = await TaskModel.updateOne(
      { _id: id },
      { $set: itemUpdate },
      { new: true }
    );

    return updateItem;
  } catch (err: any) {
    console.log(err);
  }
};

export const remove = async (id: string) => {
  try {
    const item = await findOne(id);

    if (!item) {
      throw new Error("invalid Id");
    }

    const deleteTask: any = await TaskModel.deleteOne({ _id: id });
    return deleteTask;
  } catch (err: any) {
    console.log(err);
  }
};

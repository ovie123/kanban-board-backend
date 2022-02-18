import mongoose from "mongoose";

export interface BaseTask {
  icon: string;
  status: string;
  title: string;
  content: string;
}

export interface Task extends BaseTask {
  id: mongoose.Types.ObjectId;
}

import { Schema, model, connect } from "mongoose";

import { Task } from "./task.interface";

const taskSchema = new Schema<Task>({
  icon: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },

  
},{
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  });

export default model("Task", taskSchema);

/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./tasks.service";
import { BaseTask, Task } from "./task.interface";
import { body, param, validationResult } from "express-validator";

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get("/", [], async (req: Request, res: Response) => {
  try {
    const items: Task[] | undefined = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET items/:id

itemsRouter.get(
  "/:id",
  [param("id", "Task Id is invalid").isString()],
  async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const item: Task | any = await ItemService.findOne(id);

      if (item) {
        return res.status(200).send(item);
      }

      res.status(404).send("item not found");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

// POST items

itemsRouter.post(
  "/",
  [
    body("icon", "Task is invalid").isString(),
    body("status", "Status of the task is invalid").isString(),
    body("title", "Title of the task is invalid").isString(),
    body("content", "Content of the task is invalid").isString(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const item: BaseTask = req.body;

      const newItem = await ItemService.create(item);

      res.status(201).json(newItem);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

// PUT items/:id

itemsRouter.put(
  "/:id",
  [param("id", "Task Id is invalid").isString()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id: string = req.params.id;

    try {
      const itemUpdate: Task = req.body;

      const existingItem: any = await ItemService.findOne(id);

      if (existingItem) {
        const updatedItem = await ItemService.update(id, itemUpdate);
        return res.status(200).json(updatedItem);
      } else {
        return res.status(400).json({ errors: "Id does not exist" });
      }
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
// DELETE items/:id
itemsRouter.delete(
  "/:id",
  [param("id", "Task Id is invalid").isString()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const id: string = req.params.id;
      const existingItem: any = await ItemService.findOne(id);
      if (existingItem) {
        await ItemService.remove(id);
      } else {
        return res.status(400).json({ errors: "Id does not exist" });
      }

      return res.sendStatus(204);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

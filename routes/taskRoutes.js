import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/taskController.js";

const router = express.Router();

router
  .route("/")
  .get(getTasks)      // GET all tasks (with optional filters/pagination)
  .post(createTask);  // Create a new task

router
  .route("/:id")
  .get(getTask)        // Get single task by ID
  .put(updateTask)     // Update task
  .delete(deleteTask); // Delete task

export default router;

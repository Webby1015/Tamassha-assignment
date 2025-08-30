import Task from "../models/taskModel.js";

// GET all tasks (with optional filters and pagination)
export const getTasks = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET a single task by ID
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// CREATE a new task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    if (status && !["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const newTask = await Task.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// UPDATE a task
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    if (description !== undefined && description.trim() === "") {
      return res.status(400).json({ error: "Description cannot be empty" });
    }

    if (status && !["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// DELETE a task
export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

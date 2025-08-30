import Task from "../models/taskModel.js";


export const getTasks = async (req, res, next) => {
  try {
    let { status, page, limit } = req.query;
    const query = status ? { status } : {};

    let tasks;

    if (!status && !page && !limit) {
      tasks = await Task.find(query).sort({ createdAt: -1 });
    } else {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const skip = (page - 1) * limit;
      tasks = await Task.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    const response = {
      message: "Data retrieved successfully",
      size: tasks.length,
      data: tasks,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const response = {
      message: "Data retrieved successfully",
      data: task,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ error: "Title, description and status are required" });
    }

    if (status && !["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const newTask = await Task.create({ title, description, status });

    const response = {
      message: "Task Created successfully",
      data: newTask,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};


export const updateTask = async (req, res, next) => {

  try {

    if (req.body == undefined) {
      return res.status(400).json({ error: "Request body is required" });
    }

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

    const response = {
      message: "Task Updated successfully",
      data: updatedTask,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
        const response = {
      message: "Task deleted successfully",
      data: deletedTask,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

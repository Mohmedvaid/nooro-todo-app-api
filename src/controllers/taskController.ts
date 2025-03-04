import { Request, Response } from "express";
import { prisma } from "../db";
import { ApiError } from "../utils/errors";
import { CreateTaskInput, UpdateTaskInput } from "../types";

/**
 * Get all tasks.
 * @route GET /tasks
 * @access Public
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    throw new ApiError(500, "Failed to fetch tasks");
  }
};

/**
 * Create a new task.
 * @route POST /tasks
 * @access Public
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export const createTask = async (req: Request, res: Response) => {
  const { title, color } = req.body as CreateTaskInput;

  // Validate input
  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new ApiError(400, "Title is required and must be a non-empty string");
  }
  if (!color || typeof color !== "string" || color.trim() === "") {
    throw new ApiError(400, "Color is required and must be a non-empty string");
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        color: color.trim(),
        completed: false,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    throw new ApiError(500, "Failed to create task");
  }
};

/**
 * Update a task by ID.
 * @route PUT /tasks/:id
 * @access Public
 * @param req - The Express request object with task ID in params.
 * @param res - The Express response object.
 */
export const updateTask = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const { title, color, completed } = req.body as UpdateTaskInput;

  // Validate ID
  const taskId = Number(id);
  if (isNaN(taskId)) {
    throw new ApiError(400, "Invalid task ID");
  }

  // Validate input
  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    throw new ApiError(400, "Title must be a non-empty string if provided");
  }
  if (
    color !== undefined &&
    (typeof color !== "string" || color.trim() === "")
  ) {
    throw new ApiError(400, "Color must be a non-empty string if provided");
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    throw new ApiError(400, "Completed must be a boolean if provided");
  }

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title ? title.trim() : undefined,
        color: color ? color.trim() : undefined,
        completed,
      },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Failed to update task");
  }
};

/**
 * Delete a task by ID.
 * @route DELETE /tasks/:id
 * @access Public
 * @param req - The Express request object with task ID in params.
 * @param res - The Express response object.
 */
export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  // Validate ID
  const taskId = Number(id);
  if (isNaN(taskId)) {
    throw new ApiError(400, "Invalid task ID");
  }

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    await prisma.task.delete({ where: { id: taskId } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Failed to delete task");
  }
};

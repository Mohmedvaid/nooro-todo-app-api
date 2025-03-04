import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { TASKS_ENDPOINT } from "../constants/api";

/**
 * Router for task-related API endpoints.
 */
const router = Router();

// Task routes
router.get(TASKS_ENDPOINT, getTasks);
router.post(TASKS_ENDPOINT, createTask);
router.put(`${TASKS_ENDPOINT}/:id`, updateTask);
router.delete(`${TASKS_ENDPOINT}/:id`, deleteTask);

export default router;

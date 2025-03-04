/**
 * Interface for a Task entity.
 */
export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for creating a new task.
 */
export interface CreateTaskInput {
  title: string;
  color: string;
}

/**
 * Interface for updating an existing task.
 */
export interface UpdateTaskInput {
  title?: string;
  color?: string;
  completed?: boolean;
}

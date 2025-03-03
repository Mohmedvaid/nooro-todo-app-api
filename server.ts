import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Create a new task
app.post("/tasks", async (req, res) => {
  const { title, color } = req.body;
  const newTask = await prisma.task.create({
    data: { title, color, completed: false },
  });
  res.json(newTask);
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, color, completed },
  });
  res.json(updatedTask);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id) } });
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));

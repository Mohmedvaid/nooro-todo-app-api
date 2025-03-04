# Nooro Todo App Backend

A REST API for the Nooro Task Tracker App, built with Express.js, Prisma, and PostgreSQL for the Full-Stack Developer take-home test.

## Overview

This backend provides a REST API for managing tasks in the Todo App. It includes endpoints for creating, reading, updating, and deleting tasks, with a focus on clean architecture, modularity, and robust error handling.

## Tech Stack

- Express.js: Web framework for building the REST API.
- Prisma: ORM for database management with PostgreSQL.
- TypeScript: For type safety and better developer experience.
- PostgreSQL: Database for storing tasks (can be adapted to MySQL as per requirements).

## Project Structure

- src/: Source code
  - controllers/: Request handling logic (e.g., taskController.ts).
  - middleware/: Custom middleware (e.g., errorHandler.ts for global error handling).
  - routes/: API routes (e.g., taskRoutes.ts).
  - types/: TypeScript types for request/response data.
  - utils/: Utility functions (e.g., custom ApiError class).
  - server.ts: Entry point for the Express app.
- prisma/: Prisma schema and migrations.

## Setup Instructions

### Prerequisites

- Node.js: Version 18.x or later.
- PostgreSQL: A running PostgreSQL instance (or MySQL if preferred).
- Git: For cloning the repository.

### Steps to Run

Clone the Repository  
Run the following commands to clone the repository:  
git clone https://github.com/Mohmedvaid/nooro-todo-app-api.git  
cd nooro-todo-app-api

Install Dependencies  
Install the required dependencies:  
npm install

Set Up Environment Variables  
Create a .env file in the root directory with the following content:  
PORT=3000  
DATABASE_URL="postgresql://user:password@localhost:5432/nooro-todo?schema=public"  
ALLOWED_ORIGINS=http://localhost:3001  
- Replace user and password with your PostgreSQL credentials.  
- Ensure the database nooro-todo exists in PostgreSQL. Create it if needed by running: CREATE DATABASE "nooro-todo";

#### Database Setup

This application uses PostgreSQL as the database. Follow these steps to set up PostgreSQL locally:

1. **Install PostgreSQL**  
   - If PostgreSQL is not installed, download and install it from the official website: [https://www.postgresql.org/download/](https://www.postgresql.org/download/).  
   - For macOS, you can use Homebrew: `brew install postgresql`.  
   - For Windows or Linux, follow the installer instructions on the PostgreSQL website.

2. **Start the PostgreSQL Server**  
   - Ensure the PostgreSQL server is running on your machine.  
     - On macOS (with Homebrew): `brew services start postgresql`.  
     - On Windows, start the "PostgreSQL Server" service via the Services app or use the installer’s startup tool.  
     - On Linux, use: `sudo service postgresql start`.  
   - Verify PostgreSQL is running by connecting to it: `psql -U postgres`. If this command opens the `psql` prompt, PostgreSQL is running.

3. **Create a Database User (Optional)**  
   - By default, PostgreSQL creates a `postgres` user. You can use this user or create a new one.  
   - To create a new user, connect to PostgreSQL: `psql -U postgres`, then run:  
     ```sql
     CREATE ROLE nooro_user WITH LOGIN PASSWORD 'your_secure_password';
     ALTER ROLE nooro_user CREATEDB;

Start the Server  
- Development Mode: npm run dev (This uses ts-node to run the server directly.)  
- Production Mode: npm run build && npm start (This compiles the TypeScript code to JavaScript and runs the server.)  
The server will run on http://localhost:3000.

## API Endpoints

GET /tasks  
Description: Get all tasks  
Request Body: None  
Response Example: '[{"id": 1, "title": "Test Task", "color": "red", "completed": false, "createdAt": "2025-03-04T01:30:00.000Z", "updatedAt": "2025-03-04T01:30:00.000Z"}]'

POST /tasks  
Description: Create a new task  
Request Body: '{"title": "Test Task", "color": "red"}'  
Response Example: '{"id": 1, "title": "Test Task", "color": "red", "completed": false, "createdAt": "2025-03-04T01:30:00.000Z", "updatedAt": "2025-03-04T01:30:00.000Z"}'

PUT /tasks/:id  
Description: Update a task by ID  
Request Body: '{"title": "Updated Task", "completed": true}'  
Response Example: '{"id": 1, "title": "Updated Task", "color": "red", "completed": true, "createdAt": "2025-03-04T01:30:00.000Z", "updatedAt": "2025-03-04T01:32:00.000Z"}'

DELETE /tasks/:id  
Description: Delete a task by ID  
Request Body: None  
Response Example: '{"message": "Task deleted successfully"}'

## Error Responses

The API includes robust error handling:  
- 400 Bad Request: Invalid input (e.g., missing or empty title). Response: '{"status": "error", "message": "Title is required and must be a non-empty string"}'  
- 404 Not Found: Task not found. Response: '{"status": "error", "message": "Task not found"}'  
- 500 Internal Server Error: Database or server issues. Response: '{"status": "error", "message": "Internal server error"}'

## Running with the Frontend

This backend is designed to work with the Nooro Todo App Frontend. Follow the setup instructions in the frontend repository: [nooro-todo-app](https://github.com/Mohmedvaid/nooro-todo-app).

## Notes

- The database can be switched to MySQL by updating the provider in prisma/schema.prisma to mysql and adjusting the DATABASE_URL in .env.  
- CORS is configured to allow requests only from the frontend URL specified in ALLOWED_ORIGINS.
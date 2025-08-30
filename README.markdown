# Task Manager API

## Description
This is a RESTful API built with **Node.js** and **Express** for managing tasks. It supports full CRUD (Create, Read, Update, Delete) operations and includes advanced features like filtering by status and pagination. Tasks are stored in memory, making this a lightweight and simple solution for task management.

## Features
- Create, read, update, and delete tasks
- Filter tasks by status (pending, in-progress, completed)
- Paginate task lists for efficient retrieval
- Lightweight in-memory storage
- Comprehensive error handling (e.g., 404 for non-existent tasks)

## Prerequisites
To run this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)

## Installation
Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd your-repo-name
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the server**:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:6000`.

## API Endpoints
All endpoints are prefixed with `/api`.

### 1. Get All Tasks
- **Endpoint**: `GET /api/tasks`
- **Description**: Retrieves a list of all tasks.
- **Query Parameters (Optional)**:
  - `status`: Filter tasks by status (`pending`, `in-progress`, `completed`)
  - `page`: Page number for pagination
  - `limit`: Number of items per page
- **Examples**:
  ```bash
  curl "http://localhost:6000/api/tasks"
  curl "http://localhost:6000/api/tasks?status=pending"
  curl "http://localhost:6000/api/tasks?page=2&limit=10"
  ```

### 2. Get a Task by ID
- **Endpoint**: `GET /api/tasks/:id`
- **Description**: Retrieves a single task by its unique ID.
- **Error Handling**: Returns `404 Not Found` if the task ID does not exist.
- **Example**:
  ```bash
  curl "http://localhost:6000/api/tasks/<task_id>"
  ```

### 3. Create a New Task
- **Endpoint**: `POST /api/tasks`
- **Description**: Creates a new task.
- **Request Body**:
  - `title` (string, required): Task title
  - `description` (string, required): Task description
  - `status` (string, required): Must be `pending`, `in-progress`, or `completed`
- **Example**:
  ```bash
  curl -X POST \
    "http://localhost:6000/api/tasks" \
    -H "Content-Type: application/json" \
    -d '{
      "title": "Do laundry",
      "description": "Wash, dry, and fold all clothes.",
      "status": "pending"
    }'
  ```

### 4. Update a Task
- **Endpoint**: `PUT /api/tasks/:id`
- **Description**: Updates an existing task by its ID.
- **Request Body**: At least one of `title`, `description`, or `status` (same format as Create).
- **Error Handling**: Returns `404 Not Found` if the task ID does not exist.
- **Example**:
  ```bash
  curl -X PUT \
    "http://localhost:6000/api/tasks/<task_id>" \
    -H "Content-Type: application/json" \
    -d '{
      "title": "Updated laundry title",
      "description": "Just wash the dark clothes."
    }'
  ```

### 5. Delete a Task
- **Endpoint**: `DELETE /api/tasks/:id`
- **Description**: Deletes a task by its ID.
- **Error Handling**: Returns `404 Not Found` if the task ID does not exist.
- **Example**:
  ```bash
  curl -X DELETE "http://localhost:6000/api/tasks/<task_id>"
  ```

## Usage
Once the server is running, you can interact with the API using tools like `curl`, Postman, or any HTTP client. Replace `<task_id>` in the examples with an actual task ID from your system.

Example workflow:
1. Create a task using `POST /api/tasks`.
2. Retrieve all tasks with `GET /api/tasks` or filter by status (`?status=pending`).
3. Update a task with `PUT /api/tasks/:id` or delete it with `DELETE /api/tasks/:id`.


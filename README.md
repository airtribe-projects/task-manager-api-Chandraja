# 📝 Task Manager API

This is a simple Task Manager API built using **Node.js** and **Express.js**. It allows users to manage tasks — including creating, reading, updating, and deleting tasks — using a JSON file as the data store.

This project was developed as part of the Airtribe Backend Engineering course.

---

## 🚀 Features

- ✅ Get all tasks
- ✅ Get a specific task by ID
- ✅ Create a new task
- ✅ Update?PUT a task by ID
- ✅ Delete a task by ID

All data is persisted in a local `task.json` file.

---

## 📂 Project Structure

task-manager-api/
│
├── task.json # Task data storage
├── app.js # Express server & route handlers
├── test/
│ └── server.test.js # Predefined test cases
├── package.json
└── README.md


---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/airtribe-projects/task-manager-api-Chandraja.git
cd task-manager-api-Chandraja


npm install

npm start

Server will run on: http://localhost:3000

npm test

📬 API Endpoints


| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/tasks`     | Get all tasks       |
| GET    | `/tasks/:id` | Get task by ID      |
| POST   | `/tasks`     | Create a new task   |
| PUT    | `/tasks/:id` | Update a task by ID |
| DELETE | `/tasks/:id` | Delete a task by ID |


📘 GET /tasks
Description: Get all tasks
Response: Array of task objects
Status: 200 OK

[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  }
]




📝 POST /tasks
Description: Create a new task
Request Body (JSON):

{
  "title": "Learn Express",
  "description": "Study Express routing and middleware",
  "completed": false
}
Response: Created task with ID
Status: 201 Created or 400 Bad Request




✏ PUT /tasks/:id
Description: Update a task by ID
Request Body (JSON):
{
  "title": "Learn Express",
  "description": "Updated description",
  "completed": true
}
Response: Updated task
Status: 200 OK, 400 Bad Request, or 404 Not Found



❌ DELETE /tasks/:id
Description: Delete a task by ID
Response: Success message
Status: 200 OK or 404 Not Found

🧪 Testing with Postman 

You can use Postman  test these endpoints. Be sure to send the Content-Type: application/json header when using POST and PUT.

task-manager-api-Chandraja/
├── app.js            # Main application file
├── task.json         # Local file to store tasks
├── test/
│   └── server.test.js  # Test cases (provided by Airtribe)
└── README.md         # Project documentation



Author
Chandraja

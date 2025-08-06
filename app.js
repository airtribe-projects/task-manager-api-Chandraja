const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const tasksFilePath = path.join(__dirname, './task.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});

// GET /tasks - Get all tasks
app.get('/tasks', (_req, res) => {
  fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read task file' });
    }

    try {
      const tasks = JSON.parse(data).tasks || [];
      res.json(tasks);
    } catch (parseError) {
      res.status(500).json({ error: 'Failed to parse task data' });
    }
  });
});

// GET /tasks/:id - Get task by ID
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read the task file' });
    }

    try {
      const tasks = JSON.parse(data).tasks || [];
      const task = tasks.find(task => task.id === id);

      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (parseError) {
      console.error(parseError.message);
      res.status(500).json({ error: 'Failed to parse the task data' });
    }
  });
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;

  // ✅ Step 1: Validate input
  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof completed !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  // ✅ Step 2: Read the current tasks
  fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading task file:', err);
      return res.status(500).json({ error: 'Failed to read task file' });
    }

    try {
      const parsed = JSON.parse(data);
      const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];

      // ✅ Step 3: Add the new task
      const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
      const newTask = {
        id: lastId + 1,
        title,
        description,
        completed
      };

      tasks.push(newTask);

      // ✅ Step 4: Save updated tasks back to the file
      fs.writeFile(
        tasksFilePath,
        JSON.stringify({ tasks }, null, 2),
        (err) => {
          if (err) {
            console.error('Error writing task file:', err);
            return res.status(500).json({ error: 'Failed to save the new task' });
          }

          // ✅ Step 5: Respond with the new task
          res.status(201).json(newTask);
        }
      );
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Failed to parse task data' });
    }
  });
});


// PUT /tasks/:id - Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  // Validate input first
  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof completed !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Failed to read file:', err);
      return res.status(500).json({ error: 'Failed to read task file' });
    }

    try {
      const parsed = JSON.parse(data);
      const tasks = parsed.tasks || [];

      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Update the task
      tasks[taskIndex] = { id, title, description, completed };

      fs.writeFile(
        tasksFilePath,
        JSON.stringify({ tasks }, null, 2),
        (err) => {
          if (err) {
            console.error('Failed to write file:', err);
            return res.status(500).json({ error: 'Failed to save task' });
          }
          res.json(tasks[taskIndex]);
        }
      );
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      res.status(500).json({ error: 'Failed to parse task data' });
    }
  });
});


// DELETE /tasks/:id - Delete task by ID
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Failed to read file:', err);
      return res.status(500).json({ error: 'Failed to read task file' });
    }

    try {
      const parsed = JSON.parse(data);
      const tasks = parsed.tasks || [];

      const filteredTasks = tasks.filter(task => task.id !== id);

      if (tasks.length === filteredTasks.length) {
        return res.status(404).json({ error: 'Task not found' });
      }

      fs.writeFile(
        tasksFilePath,
        JSON.stringify({ tasks: filteredTasks }, null, 2),
        (err) => {
          if (err) {
            console.error('Failed to write file:', err);
            return res.status(500).json({ error: 'Failed to delete task' });
          }

          res.json({ message: `Task with ID ${id} deleted successfully.` });
        }
      );
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      res.status(500).json({ error: 'Failed to parse task data' });
    }
  });
});

module.exports = app;

const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

// Middleware kiểm tra token (giả lập)
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token !== 'Bearer fake-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

// Middleware kiểm tra deadline & update status
function checkOverdue() {
  const now = new Date();
  tasks.forEach(task => {
    if (task.status !== 'done' && new Date(task.deadline) < now) {
      task.status = 'overdue';
    }
  });
}

// GET tất cả tasks
app.get('/tasks', (req, res) => {
  checkOverdue();
  res.json(tasks);
});

// POST tạo task
app.post('/tasks', (req, res) => {
  const { title, deadline } = req.body;
  const task = {
    id: Date.now(),
    title,
    deadline,
    status: 'pending'
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id → cập nhật task theo ID
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, deadline, status } = req.body;
  
    const task = tasks.find(t => t.id == id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
  
    // Cập nhật giá trị
    task.title = title || task.title;
    task.deadline = deadline || task.deadline;
    task.status = status || task.status;
  
    res.json({ message: 'Task updated', task });
  });

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.status(204).send();
});

// Khởi động server
app.listen(3000, () => console.log('Task API chạy tại http://localhost:3000'));

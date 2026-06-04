const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

// Protect all routes under this router
router.use(protect);

// Routes: /api/tasks
router.route('/')
  .get(getTasks)
  .post(createTask);

// Routes: /api/tasks/:id
router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

// Route: PATCH /api/tasks/:id/status
router.patch('/:id/status', toggleTaskStatus);

module.exports = router;

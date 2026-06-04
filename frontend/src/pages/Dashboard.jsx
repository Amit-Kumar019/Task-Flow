import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import {
  CheckSquare,
  LogOut,
  Plus,
  Search,
  Filter,
  AlertCircle,
  ClipboardList
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Please reload the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Create or Update task
  const handleFormSubmit = async (taskData) => {
    setError('');
    try {
      if (editingTask) {
        // Update task: PUT /api/tasks/:id
        const response = await API.put(`/tasks/${editingTask._id}`, taskData);
        setTasks(tasks.map(t => t._id === editingTask._id ? response.data : t));
      } else {
        // Create task: POST /api/tasks
        const response = await API.post('/tasks', taskData);
        setTasks([response.data, ...tasks]);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving task:', err);
      setError(err.response?.data?.message || 'Failed to save task. Please try again.');
    }
  };

  // Toggle status: PATCH /api/tasks/:id/status
  const handleToggleStatus = async (id) => {
    try {
      const response = await API.patch(`/tasks/${id}/status`);
      setTasks(tasks.map(t => t._id === id ? response.data : t));
    } catch (err) {
      console.error('Error toggling status:', err);
      setError('Failed to update task status.');
    }
  };

  // Delete task: DELETE /api/tasks/:id
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    setError('');
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task.');
    }
  };

  // Filter tasks based on search query and status filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <div className="sidebar-logo-icon">
              <CheckSquare size={24} />
            </div>
            <span className="sidebar-title">TaskFlow</span>
          </div>

          <div className="sidebar-content">
            <div>
              <div className="welcome-box">
                <div className="welcome-label">Welcome</div>
                <div className="welcome-name">{user?.name || 'User'}</div>
              </div>

              <ul className="nav-menu">
                <li>
                  <button className="nav-item-btn active">
                    <ClipboardList size={18} />
                    <span>My Tasks</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="nav-item-btn" onClick={logout} style={{ borderTop: 'none' }}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header-bar">
          <h1 className="page-title">Dashboard</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Logged in as <strong>{user?.email}</strong>
          </div>
        </header>

        <div className="content-body">
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="dashboard-actions">
            <button className="btn btn-primary" onClick={handleOpenAddModal}>
              <Plus size={18} />
              <span>Add Task</span>
            </button>

            <div className="search-filter-group">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Task Grid */}
          {loading ? (
            <div className="flex-center" style={{ minHeight: '300px' }}>
              <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
            </div>
          ) : filteredTasks.length > 0 ? (
            <div className="task-grid">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteTask}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <ClipboardList size={32} />
              </div>
              <h3 className="empty-state-title">No tasks found</h3>
              <p className="empty-state-desc">
                {searchQuery || statusFilter !== 'All' 
                  ? "We couldn't find any tasks matching your search or filter criteria."
                  : "Get started by creating your first task to stay organized!"}
              </p>
              {!searchQuery && statusFilter === 'All' && (
                <button className="btn btn-primary" onClick={handleOpenAddModal}>
                  <Plus size={16} />
                  <span>Create Task</span>
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;

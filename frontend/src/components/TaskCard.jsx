import { Edit2, Trash2, CheckCircle, Clock } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <div className="task-card">
      <div>
        <div className="task-card-header">
          <h3 className={`task-card-title ${isCompleted ? 'line-through text-muted' : ''}`} style={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'var(--text-secondary)' : 'var(--text)' }}>
            {task.title}
          </h3>
        </div>
        <p className="task-card-desc" style={{ color: isCompleted ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
          {task.description || 'No description provided.'}
        </p>
      </div>

      <div className="task-card-footer">
        <span
          className={`badge ${isCompleted ? 'badge-completed' : 'badge-pending'}`}
          onClick={() => onToggleStatus(task._id)}
          title="Click to toggle status"
        >
          {isCompleted ? (
            <>
              <CheckCircle size={12} />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Clock size={12} />
              <span>Pending</span>
            </>
          )}
        </span>

        <div className="task-card-actions">
          <button
            className="action-btn action-btn-edit"
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="action-btn action-btn-delete"
            onClick={() => onDelete(task._id)}
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

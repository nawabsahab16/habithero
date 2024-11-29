import { useTaskStore } from '../../store/taskStore';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

const TaskList = () => {
  const { tasks, completeTask, deleteTask } = useTaskStore();

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => completeTask(task.id)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              {task.completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
            <div>
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-500">{task.description}</p>
              )}
              {task.streak > 0 && (
                <span className="text-xs text-indigo-600">🔥 {task.streak} day streak!</span>
              )}
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500">No tasks yet. Add your first task to get started!</p>
      )}
    </div>
  );
};

export default TaskList;
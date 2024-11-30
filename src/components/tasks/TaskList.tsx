import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../../store/taskStore';
import { CheckCircle, Circle, Trash2, Award } from 'lucide-react';

const TaskList = () => {
  const { tasks, completeTask, deleteTask } = useTaskStore();

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => completeTask(task.id)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </motion.button>
                <div>
                  <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  )}
                  {task.streak > 0 && (
                    <div className="flex items-center mt-2">
                      <Award className="w-4 h-4 text-indigo-600 mr-1" />
                      <span className="text-sm text-indigo-600 font-medium">
                        {task.streak} day streak!
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {tasks.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-8"
        >
          No tasks yet. Add your first task to get started!
        </motion.p>
      )}
    </div>
  );
};

export default TaskList;
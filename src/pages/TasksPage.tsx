import React from 'react';
import { useAuthStore } from '../store/authStore';
import AddTaskForm from '../components/tasks/AddTaskForm';
import TaskList from '../components/tasks/TaskList';
import { Coins } from 'lucide-react';

const TasksPage = () => {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600">Track your daily habits and earn rewards</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full">
          <Coins className="w-5 h-5 text-indigo-600" />
          <span className="font-medium text-indigo-600">{user.coins} coins</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h2>
        <AddTaskForm />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Your Tasks</h2>
        <TaskList />
      </div>
    </div>
  );
};

export default TasksPage;
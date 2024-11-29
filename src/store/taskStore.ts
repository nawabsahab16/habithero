import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { TaskState, Task } from '../types';
import { useAuthStore } from './authStore';

const STORAGE_KEY = 'habitHero_tasks';

const getStoredTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: getStoredTasks(),

  addTask: (taskData) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newTask: Task = {
      id: uuidv4(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      ...taskData
    };

    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  completeTask: (taskId) => {
    set((state) => {
      const updatedTasks = state.tasks.map(task => {
        if (task.id === taskId) {
          const lastCompleted = task.lastCompletedAt ? new Date(task.lastCompletedAt) : null;
          const today = new Date();
          const isConsecutiveDay = lastCompleted && 
            today.getDate() - lastCompleted.getDate() === 1;

          return {
            ...task,
            completed: true,
            streak: isConsecutiveDay ? task.streak + 1 : 1,
            lastCompletedAt: today.toISOString()
          };
        }
        return task;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });

    // Update user coins
    const user = useAuthStore.getState().user;
    if (user) {
      const updatedUser = {
        ...user,
        coins: user.coins + 10 // Award 10 coins for completing a task
      };
      localStorage.setItem('habitHero_auth', JSON.stringify({ user: updatedUser }));
      useAuthStore.setState({ user: updatedUser });
    }
  },

  deleteTask: (taskId) => {
    set((state) => {
      const updatedTasks = state.tasks.filter(task => task.id !== taskId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  }
}));
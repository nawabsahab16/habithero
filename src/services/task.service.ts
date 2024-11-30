import { storage } from './storage';
import { Task } from '../types';
import { generateId } from '../utils/generateId';
import { AuthService } from './auth.service';

const TASKS_KEY = 'habitHero_tasks';

export class TaskService {
  static getTasks(): Task[] {
    const user = AuthService.getCurrentUser();
    if (!user) return [];

    const tasks = storage.get(TASKS_KEY) || [];
    return tasks.filter((task: Task) => task.userId === user.id);
  }

  static async createTask(taskData: Omit<Task, 'id' | 'userId' | 'createdAt'>): Promise<Task> {
    const user = AuthService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to create tasks');
    }

    const newTask: Task = {
      id: generateId(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      ...taskData
    };

    const tasks = this.getTasks();
    tasks.push(newTask);
    storage.set(TASKS_KEY, tasks);

    return newTask;
  }

  static async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;
    storage.set(TASKS_KEY, tasks);

    return updatedTask;
  }

  static async deleteTask(taskId: string): Promise<void> {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    storage.set(TASKS_KEY, filteredTasks);
  }

  static async completeTask(taskId: string): Promise<Task> {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    const lastCompleted = task.lastCompletedAt ? new Date(task.lastCompletedAt) : null;
    const today = new Date();
    const isConsecutiveDay = lastCompleted && 
      today.getDate() - lastCompleted.getDate() === 1;

    const updatedTask = await this.updateTask(taskId, {
      completed: true,
      streak: isConsecutiveDay ? (task.streak || 0) + 1 : 1,
      lastCompletedAt: today.toISOString()
    });

    const user = AuthService.getCurrentUser();
    if (user) {
      await AuthService.updateUser({
        coins: user.coins + 10
          + (updatedTask.streak > 1 ? Math.floor(updatedTask.streak / 2) : 0) 
      });
    }

    return updatedTask;
  }
}
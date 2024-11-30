import React from 'react';
import { useForm } from 'react-hook-form';
import { useTaskStore } from '../../store/taskStore';

interface AddTaskFormData {
  title: string;
  description?: string;
}

const AddTaskForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddTaskFormData>();
  const addTask = useTaskStore(state => state.addTask);

  const onSubmit = (data: AddTaskFormData) => {
    addTask({
      title: data.title,
      description: data.description,
      completed: false,
      streak: 0
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          {...register('title', { required: 'Task title is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <textarea
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          placeholder="Add task description"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
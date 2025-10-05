import api from './axios'
import { Task, TaskQuery, TaskResponse } from '../types/task'

// Get tasks with query parameters
export const getTasks = async (params: TaskQuery): Promise<TaskResponse> => {
  const { data } = await api.get<TaskResponse>('/tasks', { params })
  return data
}

// Create a new task
export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const { data } = await api.post<Task>('/tasks', task)
  return data
}

// Update an existing task
export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${id}`, task)
  return data
}

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}

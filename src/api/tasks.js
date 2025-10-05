import api from './axios';
// Get tasks with query parameters
export const getTasks = async (params) => {
    const { data } = await api.get('/tasks', { params });
    return data;
};
// Create a new task
export const createTask = async (task) => {
    const { data } = await api.post('/tasks', task);
    return data;
};
// Update an existing task
export const updateTask = async (id, task) => {
    const { data } = await api.put(`/tasks/${id}`, task);
    return data;
};
// Delete a task
export const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
};

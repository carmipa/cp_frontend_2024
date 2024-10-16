import axios from 'axios';

const API_URL = 'https://todo-caio.azurewebsites.net/api';

export const getAllTargets = async () => {
  const response = await axios.get(`${API_URL}/Targets`);
  return response.data;
};

export const getTodosByTargetId = async (id: number) => {
  const response = await axios.get(`${API_URL}/Targets/${id}`);
  return response.data.todo;
};

export const createTarget = async (target: any) => {
  const response = await axios.post(`${API_URL}/Targets`, target);
  return response.data;
};

export const createTodo = async (todo: any) => {
  const response = await axios.post(`${API_URL}/Todo`, todo);
  return response.data;
};

export const updateTarget = async (id: number, target: any) => {
  const response = await axios.put(`${API_URL}/Targets/${id}`, target);
  return response.data;
};

export const updateTodo = async (id: number, todo: any) => {
  const response = await axios.put(`${API_URL}/Todo/${id}`, todo);
  return response.data;
};

export const deleteTarget = async (id: number) => {
  const response = await axios.delete(`${API_URL}/Targets/${id}`);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${API_URL}/Todo/${id}`);
  return response.data;
};

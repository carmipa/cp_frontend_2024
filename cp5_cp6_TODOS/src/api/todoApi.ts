import axios, { AxiosError } from 'axios';

// Define the type Target
type Target = {
  id: number;
  title: string;
  isComplete: boolean;
  description: string;
  todo: Todo[];
};

// Define the type Todo
type Todo = {
  id: number;
  title: string;
  isComplete: boolean;
  description: string;
  targetId: number;
};

// Function to check if it's a production environment
const isProduction = import.meta.env.PROD;

// Logging functions using console
const logger = {
  info: (...args: unknown[]) => {
    if (!isProduction) {
      console.info(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (!isProduction) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (!isProduction) {
      console.error(...args);
    }
  },
};

const API_URL = 'http://caiohalbertfiap-001-site1.dtempurl.com/api';  // Complete base URL of the API

// Credentials for basic authentication
const username = '11194603'; // Your username
const password = '60-dayfreetrial'; // Your password
const authHeader = `Basic ${btoa(`${username}:${password}`)}`; // Encode credentials in Base64

// Default settings for all Axios requests with basic authentication
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: authHeader,  // Send the authentication header
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Configuring interceptors
axiosInstance.interceptors.request.use(
    (config) => {
      // Log the request
      logger.info('Making request', { method: config.method, url: config.url, data: config.data });
      return config;
    },
    (error) => {
      // Log request error
      logger.error('Request error', { error });
      return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
      // Log the response
      logger.info('Received response', { url: response.config.url, status: response.status, data: response.data });
      return response;
    },
    (error) => {
      // Log response error
      logger.error('Response error', { error });
      return Promise.reject(error);
    }
);

// Function to handle errors in a standardized way and display detailed logs
const handleRequestError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    logger.error('API response error', {
      status: status, // HTTP status returned by the API
      data: error.response.data, // Data returned by the API
      headers: error.response.headers, // HTTP headers
    });

    // Custom handling based on status codes
    switch (status) {
      case 202:
        logger.warn('Accepted but not processed');
        break;
      case 400:
        logger.error('Bad Request');
        break;
      case 401:
        logger.error('Unauthorized');
        break;
      case 403:
        logger.error('Forbidden');
        break;
      case 404:
        logger.error('Not Found');
        break;
      case 500:
        logger.error('Internal Server Error');
        break;
      case 503:
        logger.error('Service Unavailable');
        break;
      default:
        logger.error('Unhandled status code');
    }
  } else if (error.request) {
    logger.error('Request error:', { request: error.request });
  } else {
    logger.error('Error setting up request:', { message: error.message });
  }
  throw new Error((error.response?.data as { message?: string })?.message || 'API error');
};

// ===== FUNCTIONS TO HANDLE "TARGETS" =====

// Function to get all Targets
export const getAllTargets = async (): Promise<Target[] | null> => {
  try {
    logger.info('Starting request to get all Targets');
    const response = await axiosInstance.get<Target[]>('/Targets');
    logger.info('Targets loaded successfully', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Function to get a specific Target by ID
export const getTargetById = async (id: number): Promise<Target | null> => {
  try {
    logger.info(`Starting request to get Target with ID: ${id}`);
    const response = await axiosInstance.get<Target>(`/Targets/${id}`);
    logger.info('Target loaded successfully', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Function to create a new Target
export const createTarget = async (target: Target): Promise<Target | null> => {
  try {
    logger.info('Starting request to create a new Target', { target });
    const response = await axiosInstance.post<Target>('/Targets', target);
    logger.info('Target created successfully', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Function to update an existing Target
export const updateTarget = async (id: number, target: Target): Promise<Target | null> => {
  try {
    logger.info(`Starting request to update Target with ID: ${id}`, { target });
    const response = await axiosInstance.put<Target>(`/Targets/${id}`, target);
    logger.info('Target updated successfully', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Function to delete a Target by ID
export const deleteTarget = async (id: number): Promise<void | null> => {
  try {
    logger.info(`Starting request to delete Target with ID: ${id}`);
    const response = await axiosInstance.delete(`/Targets/${id}`);
    if (response.status === 204) {
      logger.info(`Target with ID ${id} deleted successfully.`);
    } else {
      logger.warn('No Target was deleted.');
    }
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// ===== FUNCTIONS TO HANDLE "TODOS" =====

// Function to get all Todos
export const getAllTodos = async (): Promise<Todo[] | null> => {
  try {
    logger.info('Starting request to get all Todos');
    const response = await axiosInstance.get<Todo[]>('/Todo');
    logger.info('Todos loaded successfully', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Function to get a specific Todo by ID
export const getTodoById = async (id: number): Promise<Todo | null> => {
  try {
    logger.info(`Starting request to get Todo with ID: ${id}`);
    const response = await axiosInstance.get<Todo>(`/Todo/${id}`);
    logger.info('Todo loaded successfully', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Function to create a new Todo
export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo | null> => {
  try {
    logger.info('Starting request to create a new Todo', { todo });
    const response = await axiosInstance.post<Todo>('/Todo', todo);
    logger.info('Todo created successfully', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Function to update an existing Todo
export const updateTodo = async (id: number, todo: Todo): Promise<Todo | null> => {
  try {
    logger.info(`Starting request to update Todo with ID: ${id}`, { todo });
    const response = await axiosInstance.put<Todo>(`/Todo/${id}`, todo);
    logger.info('Todo updated successfully', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Function to delete a Todo by ID
export const deleteTodo = async (id: number): Promise<void | null> => {
  try {
    logger.info(`Starting request to delete Todo with ID: ${id}`);
    const response = await axiosInstance.delete(`/Todo/${id}`);
    if (response.status === 204) {
      logger.info(`Todo with ID ${id} deleted successfully.`);
    } else {
      logger.warn('No Todo was deleted.');
    }
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};
import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/browser';

// Inicialização do Sentry
Sentry.init({
  dsn: 'sua_dsn_do_sentry_aqui', // Substitua pela sua DSN do Sentry
  tracesSampleRate: 1.0,
});

// Função para verificar se é ambiente de produção
const isProduction = import.meta.env.PROD;

// Funções de logging usando console
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

const API_URL = 'https://todo-caio.azurewebsites.net/api';  // URL base da API

// Credenciais para autenticação básica
const username = '11194603'; // Seu nome de usuário
const password = '60-dayfreetrial'; // Sua senha
const authHeader = `Basic ${btoa(`${username}:${password}`)}`; // Codifica as credenciais em Base64

// Configurações padrão para todas as requisições Axios com autenticação básica
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: authHeader,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Configurando interceptores
axiosInstance.interceptors.request.use(
    config => {
      // Log da requisição
      logger.info('Fazendo requisição', {
        method: config.method,
        url: config.url,
        data: config.data,
      });
      return config;
    },
    error => {
      // Log de erro na requisição
      logger.error('Erro na requisição', { error });
      Sentry.captureException(error);
      return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    response => {
      // Log da resposta
      logger.info('Recebida resposta', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    error => {
      // Log de erro na resposta
      logger.error('Erro na resposta', { error });
      Sentry.captureException(error);
      return Promise.reject(error);
    },
);

// Definição de tipos para Target e Todo
export interface Target {
  id?: number;
  title: string;
  description: string;
  isComplete?: boolean;
  targetId?: number; // Adicione esta linha
}

export interface Todo {
  id?: number;
  title: string;
  description: string;
  targetId: number;
  isComplete: boolean;
}

// Função para tratar erros de forma padronizada e exibir logs detalhados
const handleRequestError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    logger.error('Erro na resposta da API', {
      status: status, // Status HTTP retornado pela API
      data: error.response.data, // Dados retornados pela API
      headers: error.response.headers, // Cabeçalhos HTTP
    });

    // Tratamento personalizado com base nos códigos de status
    switch (status) {
      case 202:
        logger.warn('Pedido aceito, mas ainda está sendo processado.');
        break;
      case 400:
        logger.error('Erro 400: Requisição inválida. Verifique os dados enviados.');
        break;
      case 401:
        logger.error('Erro 401: Não autorizado. Verifique suas credenciais.');
        break;
      case 403:
        logger.error('Erro 403: Acesso proibido.');
        break;
      case 404:
        logger.error('Erro 404: Recurso não encontrado.');
        break;
      case 500:
        logger.error('Erro 500: Erro interno do servidor.');
        break;
      case 503:
        logger.error('Erro 503: Serviço indisponível. Tente novamente mais tarde.');
        break;
      default:
        logger.error(`Erro ${status}: Um erro inesperado ocorreu.`);
        break;
    }
  } else if (error.request) {
    logger.error('Erro na requisição:', { request: error.request });
  } else {
    logger.error('Erro ao configurar a requisição:', { message: error.message });
  }
  Sentry.captureException(error);
  throw new Error((error.response?.data as { message?: string })?.message || 'Erro na API');
};

// ===== FUNÇÕES PARA MANIPULAR "TARGETS" =====

// Função para obter todos os Targets
export const getAllTargets = async (): Promise<Target[] | null> => {
  try {
    logger.info('Iniciando a requisição para obter todos os Targets');
    const response = await axiosInstance.get<Target[]>('/Targets');
    logger.info('Targets carregados com sucesso', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Função para obter um Target específico por ID
export const getTargetById = async (id: number): Promise<Target | null> => {
  try {
    logger.info(`Iniciando a requisição para obter o Target com ID: ${id}`);
    const response = await axiosInstance.get<Target>(`/targets/${id}`);
    if (response.data) {
      logger.info('Target encontrado', { data: response.data });

      // Uso do fetch para Detalhamento Adicional
      const additionalDetailsResponse = await fetch(`${API_URL}/targets/${id}/details`, {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (additionalDetailsResponse.ok) {
        const detailsData = await additionalDetailsResponse.json();
        logger.info('Detalhes adicionais obtidos com sucesso', { data: detailsData });

        // Combina os detalhes adicionais com o Target original
        const fullTarget = { ...response.data, ...detailsData };
        return fullTarget;
      } else {
        logger.warn('Não foi possível obter detalhes adicionais', { status: additionalDetailsResponse.status });
        return response.data;
      }
    } else {
      logger.warn(`Target com ID ${id} não encontrado.`);
      return null;
    }
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Função para criar um novo Target
export const createTarget = async (target: Target): Promise<Target | null> => {
  try {
    logger.info('Iniciando a requisição para criar um novo Target', { target });
    const response = await axiosInstance.post<Target>('/targets', target);
    logger.info('Target criado com sucesso', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Função para atualizar um Target existente
export const updateTarget = async (id: number, target: Target): Promise<Target | null> => {
  try {
    logger.info(`Iniciando a requisição para atualizar o Target com ID: ${id}`);
    const response = await axiosInstance.put<Target>(`/targets/${id}`, target);
    if (response.status === 204) {
      logger.info(`Target com ID ${id} atualizado com sucesso.`);
      return target;
    } else {
      logger.info('Target atualizado', { data: response.data });
      return response.data;
    }
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Função para deletar um Target pelo ID
export const deleteTarget = async (id: number): Promise<void | null> => {
  try {
    logger.info(`Iniciando a requisição para deletar o Target com ID: ${id}`);
    const response = await axiosInstance.delete(`/targets/${id}`);
    if (response.status === 204) {
      logger.info(`Target com ID ${id} deletado com sucesso.`);
    } else {
      logger.warn('Nenhum Target foi deletado.');
    }
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// ===== FUNÇÕES PARA MANIPULAR "TODOS" =====

// Função para obter todos os Todos
export const getAllTodos = async (): Promise<Todo[] | null> => {
  try {
    logger.info('Iniciando a requisição para obter todos os Todos');
    const response = await axiosInstance.get<Todo[]>('/Todo');
    logger.info('Todos carregados com sucesso', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Função para obter um Todo específico por ID
export const getTodoById = async (id: number): Promise<Todo | null> => {
  try {
    logger.info(`Iniciando a requisição para obter o Todo com ID: ${id}`);
    const response = await axiosInstance.get<Todo>(`todo/${id}`);
    if (response.data) {
      logger.info('Todo encontrado', { data: response.data });
      // Uso do fetch para Detalhamento Adicional (se aplicável)
      return response.data;
    } else {
      logger.warn(`Todo com ID ${id} não encontrado.`);
      return null;
    }
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Função para criar um novo Todo
export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo | null> => {
  try {
    logger.info('Iniciando a requisição para criar um novo Todo', { todo });
    const response = await axiosInstance.post<Todo>('/Todo', todo);
    logger.info('Todo criado com sucesso', { data: response.data });
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Função para atualizar um Todo existente
export const updateTodo = async (id: number, todo: Todo): Promise<Todo | null> => {
  try {
    logger.info(`Iniciando a requisição para atualizar o Todo com ID: ${id}`);
    const response = await axiosInstance.put<Todo>(`/Todo/${id}`, todo);
    if (response.status === 204) {
      logger.info(`Todo com ID ${id} atualizado com sucesso.`);
      return todo;
    } else {
      logger.info('Todo atualizado', { data: response.data });
      return response.data;
    }
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};

// Função para deletar um Todo pelo ID
export const deleteTodo = async (id: number): Promise<void | null> => {
  try {
    logger.info(`Iniciando a requisição para deletar o Todo com ID: ${id}`);
    const response = await axiosInstance.delete(`/todo/${id}`);
    if (response.status === 204) {
      logger.info(`Todo com ID ${id} deletado com sucesso.`);
    } else {
      logger.warn('Nenhum Todo foi deletado.');
    }
  } catch (error) {
    handleRequestError(error as AxiosError);
    return null;
  }
};
import React, { useEffect, useState } from 'react';
import { getAllTodos } from '../api/todoApi';

interface Todo {
  id: number;
  title: string;
  isComplete: boolean;
  description: string;
  targetId: number;
}

interface TodoListProps {
  refresh: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ refresh }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getAllTodos();
        console.log('TODOs carregados:', data);
        setTodos(data);
      } catch (error) {
        console.error('Erro ao buscar os TODOs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [refresh]);

  return (
    <div className="todo-list">
      <h2>Lista de TODOs</h2>
      {loading ? (
        <p>Carregando TODOs...</p>
      ) : todos.length === 0 ? (
        <p>Nenhum TODO encontrado.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>{todo.isComplete ? 'Completo' : 'Incompleto'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

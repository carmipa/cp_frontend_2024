import React, { useState } from 'react';
import { createTodo, updateTodo, deleteTodo, getTodoById, Todo } from '../api/todoApi';

interface TodoFormProps {
  onTodoUpdated: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoUpdated }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [foundTodo, setFoundTodo] = useState<Todo | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const validateId = (id: string): number | null => {
    const todoId = Number(id);
    if (isNaN(todoId) || todoId <= 0) {
      setMessage('Please enter a valid ID.');
      return null;
    }
    return todoId;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || targetId === null) {
      setMessage('Please fill in the title, description, and target ID.');
      return;
    }

    try {
      await createTodo({ title, description, isComplete, targetId });
      setMessage('Todo created successfully!');
      resetForm();
      onTodoUpdated();
    } catch (error) {
      setMessage('Error creating Todo. Details: ' + (error as Error).message);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const todoId = validateId(id);
    if (!todoId || targetId === null) return;

    if (!title || !description) {
      setMessage('Please fill in the title and description.');
      return;
    }

    try {
      await updateTodo(todoId, { title, description, isComplete, targetId });
      setMessage('Todo updated successfully!');
      resetForm();
      onTodoUpdated();
    } catch (error) {
      setMessage('Error updating Todo. Details: ' + (error as Error).message);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const todoId = validateId(id);
    if (!todoId) return;

    try {
      await deleteTodo(todoId);
      setMessage('Todo deleted successfully!');
      resetForm();
      onTodoUpdated();
    } catch (error) {
      setMessage('Error deleting Todo. Details: ' + (error as Error).message);
    }
  };

  const handleFindById = async (e: React.FormEvent) => {
    e.preventDefault();
    const todoId = validateId(id);
    if (!todoId) return;

    try {
      const todo = await getTodoById(todoId);
      setFoundTodo(todo);
      setMessage(todo ? null : 'Todo not found.');
    } catch (error) {
      setMessage('Error fetching Todo. Details: ' + (error as Error).message);
    }
  };

  const resetForm = () => {
    setId('');
    setTitle('');
    setDescription('');
    setIsComplete(false);
    setTargetId(null);
    setFoundTodo(null);
  };

  return (
      <div className="form-container">
        <h2>Formulário de Todo</h2>
        <form>
          <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
          />
          <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          />
          <input
              type="number"
              placeholder="Todo ID"
              value={targetId ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetId(Number(e.target.value))}
          />
          <div>
            <label>
              <input
                  type="checkbox"
                  checked={isComplete}
                  onChange={() => setIsComplete(!isComplete)}
              />
              Completo?
            </label>
          </div>
          <button type="button" onClick={handleCreate} className="bg-green">Criar</button>
          <button type="button" onClick={handleUpdate} className="bg-yellow">Atualizar</button>
          <button type="button" onClick={handleDelete} className="bg-red">Deletar</button>
          <button type="button" onClick={handleFindById} className="bg-blue">Buscar por ID</button>
        </form>

        {message && (
            <div className="message mt-4">
              <p>{message}</p>
            </div>
        )}

        {foundTodo && (
            <div>
              <h3>Todo Found</h3>
              <p>ID: {foundTodo.id}</p>
              <p>Title: {foundTodo.title}</p>
              <p>Description: {foundTodo.description}</p>
              <p>Complete: {foundTodo.isComplete ? 'Yes' : 'No'}</p>
            </div>
        )}
      </div>
  );
};

export default TodoForm;
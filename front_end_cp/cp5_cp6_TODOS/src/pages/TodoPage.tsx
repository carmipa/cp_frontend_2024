import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

const TodoPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="list-container">
      <h2 className="text-white">TODOs</h2>
      <TodoList refresh={refresh} />
      <TodoForm onTodoUpdated={handleRefresh} />
    </div>
  );
};

export default TodoPage;

import React from 'react';
import TargetPage from './TargetPage';
import TodoPage from './TodoPage';

const Home = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-center text-3xl font-bold text-white">
        Gerenciamento de Targets e TODOs
      </h1>
      <div className="mt-10">
        <TargetPage />
      </div>
      <div className="mt-10">
        <TodoPage />
      </div>
    </div>
  );
};

export default Home;

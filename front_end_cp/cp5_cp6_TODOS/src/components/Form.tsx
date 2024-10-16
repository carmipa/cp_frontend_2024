import { useState } from 'react';
import {
  createTarget,
  updateTarget,
  deleteTarget,
  getTargetById,
  Target,
} from '../api/todoApi';

const Form = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [foundTarget, setFoundTarget] = useState<Target | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const validateId = (id: string): number | null => {
    const targetId = Number(id);
    if (isNaN(targetId) || targetId <= 0) {
      setMessage('Por favor, insira um ID válido.');
      return null;
    }
    return targetId;
  };

  const handleCreate = async () => {
    if (!title || !description) {
      setMessage('Por favor, preencha o título e a descrição.');
      return;
    }

    try {
      await createTarget({ title, description, isComplete });
      setMessage('Target criado com sucesso!');
      resetForm();
    } catch (error) {
      setMessage('Erro ao criar Target. Detalhes: ' + (error as Error).message);
    }
  };

  const handleUpdate = async () => {
    const targetId = validateId(id);
    if (!targetId) return;

    if (!title || !description) {
      setMessage('Por favor, preencha o título e a descrição.');
      return;
    }

    try {
      await updateTarget(targetId, { title, description, isComplete });
      setMessage('Target atualizado com sucesso!');
      resetForm();
    } catch (error) {
      setMessage('Erro ao atualizar Target. Detalhes: ' + (error as Error).message);
    }
  };

  const handleDelete = async () => {
    const targetId = validateId(id);
    if (!targetId) return;

    try {
      await deleteTarget(targetId);
      setMessage('Target deletado com sucesso!');
      resetForm();
    } catch (error) {
      setMessage('Erro ao deletar Target. Detalhes: ' + (error as Error).message);
    }
  };

  const handleFindById = async () => {
    const targetId = validateId(id);
    if (!targetId) return;

    try {
      const target = await getTargetById(targetId);
      if (target) {
        setFoundTarget(target);
        setMessage(null);
      } else {
        setFoundTarget(null);
        setMessage('Target não encontrado.');
      }
    } catch (error) {
      setMessage('Erro ao buscar Target. Detalhes: ' + (error as Error).message);
    }
  };

  const resetForm = () => {
    setId('');
    setTitle('');
    setDescription('');
    setIsComplete(false);
    setFoundTarget(null);
  };

  return (
      <div className="form-container">
        <h2>Formulário de Targets</h2>
        <div>
          <input
              type="text"
              placeholder="ID (para atualizar, deletar ou buscar)"
              value={id}
              onChange={(e) => setId(e.target.value)}
          />
          <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          <div className="flex space-x-4">
            <button onClick={handleCreate} className="bg-green">
              Criar
            </button>
            <button onClick={handleUpdate} className="bg-yellow">
              Atualizar
            </button>
            <button onClick={handleDelete} className="bg-red">
              Deletar
            </button>
            <button onClick={handleFindById} className="bg-blue">
              Buscar por ID
            </button>
          </div>
        </div>

        {message && (
            <div className="message mt-4">
              <p>{message}</p>
            </div>
        )}

        {foundTarget && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md text-white">
              <h3>Target Encontrado</h3>
              <p>ID: {foundTarget.id}</p>
              <p>Título: {foundTarget.title}</p>
              <p>Descrição: {foundTarget.description}</p>
              <p>Completo: {foundTarget.isComplete ? 'Sim' : 'Não'}</p>
            </div>
        )}
      </div>
  );
};

export default Form;
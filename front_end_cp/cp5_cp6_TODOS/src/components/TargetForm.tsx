import { useState } from 'react';
import { createTarget, updateTarget, deleteTarget, getTargetById, Target } from '../api/todoApi';

interface TargetFormProps {
  onTargetUpdated: () => void;
}

const TargetForm: React.FC<TargetFormProps> = ({ onTargetUpdated }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || targetId === null) {
      setMessage('Por favor, preencha o título, a descrição e o ID do Target.');
      return;
    }

    try {
      await createTarget({ title, description, isComplete, targetId });
      setMessage('Target criado com sucesso!');
      resetForm();
      onTargetUpdated();
    } catch (error) {
      setMessage('Erro ao criar Target. Detalhes: ' + (error as Error).message);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetId = validateId(id);
    if (!targetId || targetId === null) return;

    if (!title || !description) {
      setMessage('Por favor, preencha o título e a descrição.');
      return;
    }

    try {
      await updateTarget(targetId, { title, description, isComplete, targetId });
      setMessage('Target atualizado com sucesso!');
      resetForm();
      onTargetUpdated();
    } catch (error) {
      setMessage('Erro ao atualizar Target. Detalhes: ' + (error as Error).message);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetId = validateId(id);
    if (!targetId) return;

    try {
      await deleteTarget(targetId);
      setMessage('Target deletado com sucesso!');
      resetForm();
      onTargetUpdated();
    } catch (error) {
      setMessage('Erro ao deletar Target. Detalhes: ' + (error as Error).message);
    }
  };

  const handleFindById = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetId = validateId(id);
    if (!targetId) return;

    try {
      const target = await getTargetById(targetId);
      setFoundTarget(target);
      setMessage(target ? null : 'Target não encontrado.');
    } catch (error) {
      setMessage('Erro ao buscar Target. Detalhes: ' + (error as Error).message);
    }
  };

  const resetForm = () => {
    setId('');
    setTitle('');
    setDescription('');
    setIsComplete(false);
    setTargetId(null);
    setFoundTarget(null);
  };

  return (
      <div className="form-container">
        <h2>Formulário de Targets</h2>
        <form>
          <input
              type="text"
              placeholder="ID"
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
          <input
              type="number"
              placeholder="Target ID"
              value={targetId ?? ''}
              onChange={(e) => setTargetId(Number(e.target.value))}
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

        {foundTarget && (
            <div>
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

export default TargetForm;
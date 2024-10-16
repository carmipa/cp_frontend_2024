import React, { useEffect, useState } from 'react';
import { getAllTargets, Target } from '../api/todoApi';

interface TargetListProps {
  refresh: boolean;
}

const TargetList: React.FC<TargetListProps> = ({ refresh }) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTargets = async () => {
      setLoading(true);
      try {
        const data = await getAllTargets();
        setTargets(data || []);
        console.log("Targets carregados:", data);
      } catch (error) {
        console.error("Erro ao carregar Targets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTargets();
  }, [refresh]);

  return (
      <div className="mt-5">
        <h3 className="text-white">Lista de Targets</h3>
        {loading ? <p>Carregando Targets...</p> : (
            <ul className="list-disc text-white">
              {targets.length > 0 ? targets.map(target => (
                  <li key={target.id}>
                    <strong>{target.title}</strong>: {target.description} - {target.isComplete ? 'Completo' : 'Incompleto'}
                  </li>
              )) : <li>Nenhum Target encontrado.</li>}
            </ul>
        )}
      </div>
  );
};

export default TargetList;
import React, { useState } from 'react';
import TargetList from '../components/TargetList';
import TargetForm from '../components/TargetForm';

const TargetPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="list-container">
      <h2 className="text-white">Targets</h2>
      <TargetList refresh={refresh} />
      <TargetForm onTargetUpdated={handleRefresh} />
    </div>
  );
};

export default TargetPage;

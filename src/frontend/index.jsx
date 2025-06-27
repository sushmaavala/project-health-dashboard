import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    invoke('getProjectStats').then(setStats);
  }, []);

  return (
    <>
      <Text>Hello from Project Health Dashboard 👋</Text>
      {!stats ? (
        <Text>Loading project data...</Text>
      ) : (
        <>
          <Text>Total Issues: {stats.total}</Text>
          <Text>Completed: {stats.completed}</Text>
          <Text>Bugs: {stats.bugs}</Text>
          <Text>Overdue: {stats.overdue}</Text>
        </>
      )}
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

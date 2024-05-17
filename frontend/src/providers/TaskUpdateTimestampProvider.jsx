import { createContext, useState } from 'react';

export const TaskUpdateTimestampContext = createContext(null);

export const TaskUpdateTimestampProvider = ({ children }) => {
  const [latestUpdate, setLatestUpdate] = useState(null);

  return <TaskUpdateTimestampContext.Provider value={[
    latestUpdate,
    setLatestUpdate,
  ]}>
    {children}
  </TaskUpdateTimestampContext.Provider>;
};

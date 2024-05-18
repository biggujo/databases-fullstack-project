import { useEffect, useState } from 'react';
import API from '../src/utils/api.js';

const useGroupFetchById = (id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await API.groups.fetchById(id);
        setData(data);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    data,
    error,
    isLoading,
  };
};

export default useGroupFetchById;

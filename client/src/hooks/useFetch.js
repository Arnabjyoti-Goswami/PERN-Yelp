import { useState, useLayoutEffect } from 'react';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);

    try {
      const res = await fetch(url, options);
      console.log('Raw response:', res);

      const contentType = res.headers.get('content-type');
      console.log('Content-Type:', contentType);

      const resJson = await res.json();
      console.log('Parsed JSON:', resJson);
      
      if (resJson.success === false) {
        setError(resJson.message);
        setIsFetching(false);
        return;
      }

      setResponse(resJson);
      setIsFetching(false);
      setError(null);

    } catch (error) {
      setError(error);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  console.log(response);

  return { response, error, isFetching, refetch };
};

export default useFetch;
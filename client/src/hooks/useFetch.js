import { useState, useLayoutEffect } from 'react';
import axios from 'axios';

const useFetch = (url, options=null) => {
  const baseUrl = import.meta.env.VITE_EXPRESS_SERVER_BASE_URL;
  const fetchUrl = baseUrl + url;

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);

    try {
      const axiosOptions = {
        method: options?.method || 'GET',
        headers: options?.headers || {},
        url: fetchUrl,
      };
      axiosOptions.headers = {
        ...axiosOptions.headers,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      if (options?.body) {
        axiosOptions.data = options.body;
      }
      console.log('Request options:', axiosOptions);
      
      const res = await axios(axiosOptions);
      console.log('Raw response:', res);

      const contentType = res.headers['content-type'];
      console.log('Content-Type:', contentType);

      const resJson = res.data;
      console.log('Data:');
      console.log(resJson);
      
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

  return { response, error, isFetching, refetch };
};

export default useFetch;
import axios from 'axios';

const useFetch = (url, options=null) => {
  const baseUrl = import.meta.env.VITE_EXPRESS_SERVER_BASE_URL;
  const fetchUrl = baseUrl + url;

  const fetchData = async () => {
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
      const error = new Error();
      error.statusCode = resJson.statusCode;
      error.message = resJson.message;
      return error;
    }
    return resJson;
  };

  return fetchData;
};

export default useFetch;
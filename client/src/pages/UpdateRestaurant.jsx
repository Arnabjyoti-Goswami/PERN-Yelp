import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CheckOutlined } from '@ant-design/icons';
import { CiLocationOn } from 'react-icons/ci';

import useFetch from '../hooks/useFetch.js';

const UpdateRestaurant = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({});

  const fetchRestaurant = async () => {
    setIsLoading(true);
    try {
      const fetchUrl = `/api/v1/restaurants/${id}`;
      const fetchData = useFetch(fetchUrl);
      const response = await fetchData();
      setRestaurant(response.data.restaurant);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  let returnMessage;
  if (isLoading) {
    returnMessage =
    <div className='text-slate-800 text-5xl text-center
    pt-20'>
      Loading...
    </div>;
  } else if (error) {
    returnMessage =
    <div className='text-red-800 text-5xl text-center
    pt-20'>
      Error: {error}
    </div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.price_range) {
      return;
    }

    try {
      const fetchUrl = `/api/v1/restaurants/${id}`;
      const fetchOptions = {
        method: 'PUT',
        body: {
          name: formData.name,
          location: formData.location,
          price_range: formData.price_range,
        },
      };
      const fetchData = useFetch(fetchUrl, fetchOptions);
      const response = await fetchData();
      setRestaurant(response.data.restaurant);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };
  
  return (
    <>
    {
    restaurant ? (
    <div className='h-full w-full flex flex-col items-center justify-start pt-10 relative'>
      <div className='flex justify-center 
        text-slate-800 text-center
        pt-10 gap-10 mb-10'>
          <div className='text-5xl'>
            {restaurant.name}
          </div>
          <div className='text-3xl
          flex items-center'>
            <CiLocationOn className='mr-2' />
            {restaurant.location}
          </div>
          <div className='text-3xl flex items-center'>
            Price Range: {restaurant.price_range}
          </div>
      </div>
      <form className='flex items-center mb-4
      justify-between w-[80%]'
      onSubmit={handleSubmit}>
        <input
        type='text'
        defaultValue={restaurant.name}
        placeholder='Restaurant Name'
        className='p-2 rounded border-slate-300 w-[40%] border-2
        focus:outline-none focus:border-slate-700 focus:border-2'
        id='name'
        onChange={handleChange}
        />
        <input
        type='text'
        defaultValue={restaurant.location}
        placeholder='Location'
        className='p-2 rounded border-slate-300 w-[40%] border-2
        focus:outline-none focus:border-slate-700 focus:border-2'
        id='location'
        onChange={handleChange}
        />
        <select
        className='p-2 rounded border-slate-300 w-[10%] border-2
        focus:outline-none focus:border-slate-700 focus:border-2'
        id='price_range'
        onChange={handleChange}
        defaultValue='0'
        >
          <option value='0' disabled>
            Price Range ({restaurant.price_range})
          </option>
          <option value='1'>
            $
          </option>
          <option value='2'>
            $$
          </option>
          <option value='3'>
            $$$
          </option>
          <option value='4'>
            $$$$
          </option>
          <option value='5'>
            $$$$$
          </option>
        </select>
        <button
        className='
        w-12 h-12 cursor-pointer
        flex items-center justify-center
        rounded-full bg-green-500 bg-opacity-70 hover:bg-opacity-100 
        btn
        text-white text-4xl
        '
        type='submit'>
          <CheckOutlined  style={{ fontSize: '0.8em' }} />
        </button>
      </form>
    </div>
    ) : 
    returnMessage
    }
    </>
  );
};

export default UpdateRestaurant;
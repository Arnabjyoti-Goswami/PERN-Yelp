import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CiLocationOn } from 'react-icons/ci';

import useFetch from '../hooks/useFetch.js';

const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
    {
    restaurant && (
      <div className='flex flex-col justify-center'>
        <div className='flex justify-center 
        text-slate-800 text-center
        pt-10 gap-10'>
          <div className='text-5xl'>
            {restaurant.name}
          </div>
          <div className='text-3xl
          flex items-center'>
            <CiLocationOn className='mr-2' />
            {restaurant.location}
          </div>
        </div>
        <div>
          
        </div>
      </div>
    ) 
    }

    {returnMessage}
    </>
  );
};

export default RestaurantDetails;
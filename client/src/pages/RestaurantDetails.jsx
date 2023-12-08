import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
      <div>
        <span>{restaurant.name}</span>
      </div>
    ) 
    }

    {returnMessage}
    </>
  );
};

export default RestaurantDetails;